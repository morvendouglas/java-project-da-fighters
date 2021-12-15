import React from "react";
import Da from "./Da";
import PlayerOneDa from './PlayerOneDa'
import PlayerTwoDa from "./PlayerTwoDa"
import { Link } from 'react-router-dom';

const Multiplayer = ({ das, onDaClicked, onPlayerTwoDaClicked }) => {

    const playerOneDasNodes = das.map((da, index) => {
        return (
            <li key={index}>
                <PlayerOneDa da={da} key={index} onDaClicked={onDaClicked} />
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
            <Link to="/"> <img className="home_button" src={`${process.env.PUBLIC_URL}/logo.png`}></img> </Link>
            <div>
                <h2 className="health">Player One : </h2>
                <ul className = "flex-container">
			        {playerOneDasNodes}
		        </ul>
            </div>
            <div>
                <h2 className="health">Player Two : </h2>
                <ul className = "flex-container">
			        {playerTwoDasNodes}
		        </ul>
            </div>
            <Link to="/multiplayerfight"> <img className="fight_button" src={`${process.env.PUBLIC_URL}/SquareGo.png`}></img> </Link>
        </div>
    )

}

export default Multiplayer