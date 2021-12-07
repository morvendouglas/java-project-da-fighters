import React from 'react';
import Da from './Da';
import { Link } from 'react-router-dom';
import '../App.css'

const DaList = ({ das, onDaClicked }) => {

	const dasNodes = das.map((da, index) => {
		return (
			<li key={index} >
				<Da da={da} key={index} onDaClicked={onDaClicked}/>
			</li>
		)
	})

	// const playFightMusic = function () {
    //     let fightAudio = new Audio("/main_page_screen.wav")
    //     fightAudio.play();
    // }

	return (
		<div  >
		<Link to="/"> <img className="home_button" src={`${process.env.PUBLIC_URL}/logo.png`}></img> </Link>
		<ul className = "flex-container">
			{dasNodes}
		</ul>
		<Link to="/fight"> <img className="fight_button" src={`${process.env.PUBLIC_URL}/SquareGo.png`}></img> </Link>
		</div>
	)
}
export default DaList;