import React from 'react'
import { Link } from 'react-router-dom';
import FinishScreen from './FinishScreen';

const ResultScreen = ({ winner, playerDa, onGameFinished, das, computerDa, onChooseNextRandomDa, onPlayerDaContinue, onNewDasList, onAllDasBeaten }) => {

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
            <h1>{winner.name} Won !</h1>
            {winner.name === playerDa.name ?
                <div>
                    <h2> You battered them !</h2>
                    {das.length < 2 ?
                        <button type="button" onClick={handleOnNextDaClick}>Mon then ...</button>
                        :
                        <Link to="/fight">
                            <button type="button" onClick={handleOnNextDaClick}>Mon then ...</button>
                        </Link>
                    }
                </div>
                :
                <div>
                    <h2> You got smashed ...</h2>
                    <Link to="/select"><button type="button" onClick={handleOnClick}>Play again ...</button></Link>
                </div>
            }
        </div>
    )
}

export default ResultScreen

// if player loses, 'play again' returns to select screen
// if player wins, want to move on to next 'level' (new random da)