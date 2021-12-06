import React from 'react';


const FinishScreen = ({ winner }) => {

    let url = `/scoreboard/${winner.id}`

    return (
        <div>
            <h1 className="health">{winner.name}</h1>
            <h1 className="health">You've beaten all the other Da's !</h1>
            <h2 className="health">You are the ALPHA DA !</h2>
            <a href={url} className="health" >View Scoreboard</a>
        </div>
    )
}

export default FinishScreen