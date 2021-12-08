import React from 'react'
import { Link } from 'react-router-dom';
import FinishScreen from './FinishScreen';

const ResultScreen = ({ winner, playerDa, onGameFinished, das, computerDa, onChooseNextRandomDa, onPlayerDaContinue, onNewDasList, onAllDasBeaten, messages }) => {

    const findWinMessage = function () {
        const copyMessages = [...messages]
        const winMessages = copyMessages.filter((message) => {
            return message.messageType === "WIN"
        })
        const randomIndexWin = Math.floor(Math.random() * winMessages.length)
        const randomWinMessage = winMessages[randomIndexWin]
        return randomWinMessage.comment
    }

    const findLoseMessage = function () {
        const copyMessages = [...messages]
        const loseMessages = copyMessages.filter((message) => {
            return message.messageType === "LOSE"
        })
        const randomIndexWin = Math.floor(Math.random() * loseMessages.length)
        const randomLoseMessage = loseMessages[randomIndexWin]
        return randomLoseMessage.comment
    }

    const handleOnClick = function () {
        onGameFinished(null);
    }

    const handleOnNextDaClick = function () {
        const copiedDas = [...das]
        if (copiedDas.length < 2) {
            onAllDasBeaten(playerDa)
        } else {
            for (var i = 0; i < copiedDas.length; i++) {
                if (copiedDas[i] === computerDa) {
                    copiedDas.splice(i, 1);
                }
                if (copiedDas[i] === playerDa) {
                    copiedDas.splice(i, 1);
                }
            }
            const randomIndex = Math.floor(Math.random() * copiedDas.length);
            const randomDa = copiedDas[randomIndex];
            onChooseNextRandomDa(randomDa)
            onGameFinished(null)
            onPlayerDaContinue(playerDa)
            onNewDasList(copiedDas)
        }
    }

    return (
        
        <div className="health">
        <Link to="/"> <img className="home_button" src={`${process.env.PUBLIC_URL}/logo.png`}></img> </Link>
            <h1 className="results">{winner.name} Won !</h1>
            {winner.name === playerDa.name ?
                <div>
                    <h2> You battered them !</h2>
                    <h2> Some say {computerDa.name} {findWinMessage()}</h2>
                    {das.length < 2 ?
                        <button  className="resultsbutton" type="button" onClick={handleOnNextDaClick}>Mon then ...</button>
                        :
                        <Link to="/fight">
                            <button className="resultsbutton" type="button" onClick={handleOnNextDaClick}>Mon then ...</button>
                        </Link>
                    }
                </div>
                :
                <div>
                    <h2> You got smashed ...</h2>
                    <h2> He's saying {findLoseMessage()}</h2>
                    <Link to="/select"><button type="button" onClick={handleOnClick}>Play again ...</button></Link>
                    <img className="resultsgif" height="600" src={`${process.env.PUBLIC_URL}/resultsgif.gif`} />

                </div>
            }
        </div>
    )
}

export default ResultScreen

// if player loses, 'play again' returns to select screen
// if player wins, want to move on to next 'level' (new random da)