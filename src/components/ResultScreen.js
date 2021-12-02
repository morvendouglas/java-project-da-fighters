import React from 'react'
import { Link } from 'react-router-dom';

const ResultScreen = ({ winner, playerDa, onGameFinished }) => {

    const handleOnClick = function () {
        onGameFinished(null);
    }

    return (
        <div className="health">
            <h1>{winner.name} Won !</h1>
            {winner.name === playerDa.name ?
                <h2> You battered them !</h2>
                :
                <div>
                    <h2>You got smashed ...</h2>
                    <Link to="/select"><button type="button" onClick="handleOnClick">Play again ...</button></Link>
                </div>
            }
        </div>
    )
}

export default ResultScreen

// if player loses, 'play again' returns to select screen
// if player wins, want to move on to next 'level' (new random da)