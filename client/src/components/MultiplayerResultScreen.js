import React from 'react'
import { Link } from 'react-router-dom';

const MultiplayerResultScreen = ({ winner, playerDa, onGameFinished, das, playerTwoDa, onChooseNextRandomDa, onPlayerDaContinue, onNewDasList, onAllDasBeaten, messages, changeMultiplayer }) => {

    const findWinMessage = function () {
        const copyMessages = [...messages]
        const winMessages = copyMessages.filter((message) => {
            return message.messageType === "WIN"
        })
        const randomIndexWin = Math.floor(Math.random() * winMessages.length)
        const randomWinMessage = winMessages[randomIndexWin]
        return randomWinMessage.comment
    }

    const handleOnClick = function () {
        onGameFinished(null);
        changeMultiplayer(false);
    }

    if (winner.name === playerDa.name) {
        return (
            <div className="health">
                <h1>{winner.name} Won, he battered {playerTwoDa.name} !</h1>
                <div>
                    <h2> Some say {playerTwoDa.name} {findWinMessage()}</h2>
                    <Link to="/mode"><button type="button" onClick={handleOnClick}>Play again ...</button>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="health">
                <h1>{winner.name} Won, he battered {playerDa.name} !</h1>
                <div>
                    <h2> Some say {playerDa.name} {findWinMessage()}</h2>
                    <Link to="/mode"><button type="button" onClick={handleOnClick}>Play again ...</button>
                    </Link>
                </div>
            </div>
        )
    }
    }

    export default MultiplayerResultScreen

// if player loses, 'play again' returns to select screen
// if player wins, want to move on to next 'level' (new random da)