import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import '../App.css'
import { getFID } from 'web-vitals';

const MultiplayerFightScreen = ({ playerDa, playerTwoDa, onGameFinished }) => {

    const [playerTwoHealth, setPlayerTwoHealth] = useState(20);
    const [previousPlayerTwoHealth, setPreviousPlayerTwoHealth] = useState(0);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [previousPlayerHealth, setPreviousPlayerHealth] = useState(0);
    const [playerTwoSpecialUsed, setPlayerTwoSpecialUsed] = useState(false);
    const [playerSpecialUsed, setPlayerSpecialUsed] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [gif, setGif] = useState(false)

    useEffect(() => {
        if (playerTwoHealth <= 0 & playerHealth > 0) {
            onGameFinished(playerDa);
        } else if (playerHealth <= 0 & playerTwoHealth > 0) {
            onGameFinished(playerTwoDa);
        }
    }, [playerTwoHealth, playerHealth])

    const getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }

    const handleAttack1Click = function () {
        let damage = 0;
        if (playerDa.daType === "BUFFDA") {
            damage = getRandomNumber(18, 30)
        } else if (playerDa.daType === "AVERAGEDA") {
            damage = getRandomNumber(23, 25)
        } else {
            damage = getRandomNumber(18, 25)
        }
        setPreviousPlayerTwoHealth(playerTwoHealth)
        setPlayerTwoHealth(playerTwoHealth => playerTwoHealth - damage)
        console.log("player one hit player two for : " + damage);
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
    }

    const handleAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        setPreviousPlayerTwoHealth(playerTwoHealth)
        setPlayerTwoHealth(playerTwoHealth => playerTwoHealth - damage)
        console.log("player one hit player two for : " + damage);
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
    }

    const handleHealClick = function () {
        let heal = 0;
        if (playerDa.daType === "SOFTDA") {
            heal = getRandomNumber(23, 25)
        } else {
            heal = getRandomNumber(18, 25)
        }
        if ((playerHealth + heal) >= 100) {
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerhealth => 100)
        } else if (playerHealth <= 30) {
            heal = getRandomNumber(24, 25)
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        } else {
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        }
        console.log("player one healed for : " + heal);
    }

    const handleSpecialClick = function () {
        if (playerSpecialUsed === false) {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                setPreviousPlayerTwoHealth(playerTwoHealth)
                setPlayerTwoHealth(playerTwoHealth => playerTwoHealth - opponentDamage);
                setPlayerSpecialUsed(true);
                playerDa.specialName = "Special Used"
                console.log("player one hit player two for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - selfDamage);
                setPlayerSpecialUsed(true);
                playerDa.specialName = "Special Used"
                console.log("player hit themselves for : " + selfDamage);
            }
        } else {
            return null;
        }
    }

    const handlePlayerTwoAttack1Click = function () {
        let damage = 0;
        if (playerTwoDa.daType === "BUFFDA") {
            damage = getRandomNumber(18, 30)
        } else if (playerTwoDa.daType === "AVERAGEDA") {
            damage = getRandomNumber(23, 25)
        } else {
            damage = getRandomNumber(18, 25)
        }
        setPreviousPlayerHealth(playerHealth)
        setPlayerHealth(playerHealth => playerHealth - damage)
        console.log("player two hit player one for : " + damage);
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
    }

    const handlePlayerTwoAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        setPreviousPlayerHealth(playerHealth)
        setPlayerHealth(playerHealth => playerHealth - damage)
        console.log("player two hit player one for : " + damage);
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
    }

    const handlePlayerTwoHealClick = function () {
        let heal = 0;
        if (playerTwoDa.daType === "SOFTDA") {
            heal = getRandomNumber(23, 25)
        } else {
            heal = getRandomNumber(18, 25)
        }
        if ((playerTwoHealth + heal) >= 100) {
            setPreviousPlayerTwoHealth(playerTwoHealth)
            setPlayerTwoHealth(playerTwohealth => 100)
        } else if (playerTwoHealth <= 30) {
            heal = getRandomNumber(24, 25)
            setPreviousPlayerTwoHealth(playerTwoHealth)
            setPlayerTwoHealth(playerTwoHealth => playerTwoHealth + heal)
        } else {
            setPreviousPlayerTwoHealth(playerTwoHealth)
            setPlayerTwoHealth(playerTwoHealth => playerTwoHealth + heal)
        }
        console.log("player two healed for : " + heal);
    }

    const handlePlayerTwoSpecialClick = function () {
        if (playerTwoSpecialUsed === false) {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - opponentDamage);
                setPlayerTwoSpecialUsed(true);
                playerTwoDa.specialName = "Special Used"
                console.log("player two hit player one for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousPlayerTwoHealth(playerTwoHealth)
                setPlayerTwoHealth(playerTwoHealth => playerTwoHealth - selfDamage);
                setPlayerTwoSpecialUsed(true);
                playerTwoDa.specialName = "Special Used"
                console.log("player two hit themselves for : " + selfDamage);
            }
        } else {
            return null;
        }
    }

    const showFist = function () {
        return <img src={`${process.env.PUBLIC_URL}/fist.gif`} height="200px" width="200px" />
    }


    if (gameFinished === false) {
        return (
            <>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/${playerDa.imgName}`} width="200" height="250" />
                    <ul>
                        <li className="health">{playerDa.name}</li>
                        <li className="health">{playerDa.bio}</li>
                        <li className="health">{playerDa.attackOneName}...  <button onClick={handleAttack1Click}>ATTACK</button></li>
                        <li className="health">{playerDa.attackTwoName}...  <button onClick={handleAttack2Click}>ATTACK</button></li>
                        <li className="health">{playerDa.healName}...  <button onClick={handleHealClick}>HEAL</button></li>
                    </ul>
                    {previousPlayerHealth > playerHealth ?
                        <CountUp
                            className="countUpRed"
                            start={previousPlayerHealth}
                            end={playerHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreen"
                            start={previousPlayerHealth}
                            end={playerHealth}
                            duration="1"
                        />}
                </div>
                {gif === true ? showFist() : null}
                <div>
                    <img src={`${process.env.PUBLIC_URL}/${playerTwoDa.imgName}`} width="220" height="250" />
                    <ul>
                        <li className="health">{playerTwoDa.name}</li>
                        <li className="health">{playerTwoDa.bio}</li>
                        <li className="health">{playerTwoDa.attackOneName}...  <button onClick={handlePlayerTwoAttack1Click}>ATTACK</button></li>
                        <li className="health">{playerTwoDa.attackTwoName}...  <button onClick={handlePlayerTwoAttack2Click}>ATTACK</button></li>
                        <li className="health">{playerTwoDa.healName}...  <button onClick={handlePlayerTwoHealClick}>HEAL</button></li>
                    </ul>

                    {previousPlayerTwoHealth > playerTwoHealth ?
                        <CountUp
                            className="countUpRed"
                            start={previousPlayerTwoHealth}
                            end={playerTwoHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreen"
                            start={previousPlayerTwoHealth}
                            end={playerTwoHealth}
                            duration="1"
                        />}
                </div>
            </>
        )
    } else {
        if (playerTwoHealth <= 0) {
            return (
                <>
                    <div className="health">
                        <h1>{playerDa.name} smashed {playerTwoDa.name}</h1>
                        <h2>Player One Wins !</h2>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="health">
                        <h1>{playerTwoDa.name} wrecked {playerDa.name}</h1>
                        <h2>Player Two Wins !</h2>
                    </div>
                </>
            )
        }
    }
}

export default MultiplayerFightScreen