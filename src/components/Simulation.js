import React from "react";
import Da from "./Da";
import PlayerTwoDa from "./PlayerTwoDa"
import { Link } from 'react-router-dom';

const Simulation = ({ das, onDaClicked, onPlayerTwoDaClicked }) => {

    const playerOneDasNodes = das.map((da, index) => {
        return (
            <li key={index}>
                <Da da={da} key={index} onDaClicked={onDaClicked} />
            </li>
        )
    })

    const playerTwoDasNodes = das.map((da, index) => {
        return (
            <li key={index}>
                <PlayerTwoDa da={da} key={index} onPlayerTwoDaClicked={onPlayerTwoDaClicked} />
            </li>
        )
    })

    return (
        <div>
            <h1 className="health">This is the Multiplayer screen</h1>
            <ul>
                <h2 className="health">Computer Da One : </h2>
                {playerOneDasNodes}
            </ul>
            <ul>
                <h2 className="health">Computer Da Two : </h2>
                {playerTwoDasNodes}
            </ul>
            <Link to="/simulationfight"><button type="button">Fight</button></Link>
        </div>
    )

}

export default Simulation