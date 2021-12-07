import React, { useState } from 'react';
import ScoreboardDa from './ScoreboardDa';
import ScoreboardPoints from './ScoreboardPoints';
import '../Scoreboard.css'

const Scoreboard = ({ das, handleUpdate }) => {

    const [stateDa, setStateDa] = useState(
        {
            "id": "",
            "name": "",
            "bio": "",
            "daType": "",
            "attackOneName": "",
            "attackTwoName": "",
            "healName": "",
            "imgName": "",
            "startingHealth": 100,
            "currentHealth": 100,
            "points": 0
        }
    )

    const [disable, setDisable] = useState(false);

    const findDaById = function () {
        let url = window.location.pathname
        let id = url.substring(url.lastIndexOf('/') + 1);
        return das.find((da) => {
            return da.id === parseInt(id);
        })
    }

    let daWinner = findDaById()

    const handleSubmit = function (event) {
        event.preventDefault();
        let copiedDa = { ...stateDa }
        copiedDa['id'] = daWinner.id
        copiedDa["name"] = daWinner.name
        copiedDa["bio"] = daWinner.bio
        copiedDa["daType"] = daWinner.daType
        copiedDa["attackOneName"] = daWinner.attackOneName
        copiedDa["attackTwoName"] = daWinner.attackTwoName
        copiedDa["healName"] = daWinner.healName
        copiedDa["imgName"] = daWinner.imgName
        copiedDa["points"] = daWinner.points += 100
        handleUpdate(copiedDa)
        setDisable(true)
    }

    // das.sort(function (a, b) {
    //     return b.points - a.points;
    // })

    const dasNodes = das.map((da, index) => {
        return (
            <ScoreboardDa da={da} key={index} />
        )
    })

    const daPoints = das.map((da, index) => {
        return (
            <ScoreboardPoints da={da} key={index} />
        )
    })


    // <div className="scoreboard">
    //     <form onSubmit={handleSubmit}>
    //         <button type="submit" disabled={disable}>You have Scored 100 Points - Click to Collect Points </button>
    //     </form>
    //     <span>Da League</span><span className="right">Points</span>
    //     <div>
    //         {dasNodes}
    //     </div>
    // </div>

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <button type="submit" disabled={disable} className="buttonScoreboard">You have Scored 100 Points - Click to Collect Points </button>
            </form>
            <table className="scoreboard">
                <thead >
                    <tr>
                        <th colspan={das.length} className="header">SCOREBOARD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span className="daName">Da</span></td>
                        <td><span className="daPoints">Points</span></td>
                    </tr>
                    <tr>
                        <td>{dasNodes}</td>
                        <td>{daPoints}</td>
    
                    </tr>
                
                </tbody>
            </table>
        </div>
    )
}

export default Scoreboard;