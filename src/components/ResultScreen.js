import React from 'react'

const ResultScreen = ({ winner, playerDa }) => {

    return (
        <div className="health">
            <h1>{winner.name} Won !</h1>
            {winner.name === playerDa.name ?
                <h2> You battered them !</h2>
                :
                <h2>You got smashed ...</h2>
            }
        </div>
    )
}

export default ResultScreen