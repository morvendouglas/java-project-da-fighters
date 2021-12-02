import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { getFID } from 'web-vitals';
import '../App.css'


const FightScreen = ({ playerDa, computerDa }) => {

    const [computerHealth, setComputerHealth] = useState(100);
    const [previousComputerHealth, setPreviousComputerHealth] = useState(0);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [previousPlayerHealth, setPreviousPlayerHealth] = useState(0);
    const [computerSpecialUsed, setComputerSpecialUsed] = useState(false);
    const [playerSpecialUsed, setPlayerSpecialUsed] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [gif, setGif] = useState(false)

    useEffect(() => {
        if (computerHealth <= 0 || playerHealth <= 0) {
            setGameFinished(true);
            console.log("this has been hit");
        }
        console.log("me should finish ? : " + gameFinished);
    }, [computerHealth, playerHealth])

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
        // const health = computerHealth - damage;
        setPreviousComputerHealth(computerHealth)
        setComputerHealth(computerHealth => computerHealth - damage)
        console.log("player hit computer for : " + damage);
        // checkIfGameFinished()
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
        setTimeout(function () {
            computerTurn()
        }, 2000)
    }


    const handleAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        // const health = computerHealth - damage;
        setPreviousComputerHealth(computerHealth)
        setComputerHealth(computerHealth => computerHealth - damage)
        console.log("player hit computer for : " + damage);
        // checkIfGameFinished();
        setGif(true)
        setTimeout(function () {
            setGif(false)
        }, 1500)
        setTimeout(function () {
            computerTurn()
        }, 2000)
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
            // const health = playerHealth + heal;
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        } else {
            const health = playerHealth + heal;
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        }
        console.log("player healed for : " + heal);
        // checkIfGameFinished();
        setTimeout(function () {
            computerTurn()
        }, 2000)
    }

    const handleSpecialClick = function () {
        if (playerSpecialUsed === false) {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                // const health = computerHealth - opponentDamage;
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth - opponentDamage);
                setPlayerSpecialUsed(true);
                console.log("player hit computer for : " + opponentDamage);
                // checkIfGameFinished();
                setTimeout(function () {
                    computerTurn()
                }, 2000)
            } else if (specialOutcome[specialNumber] === selfDamage) {
                // const health = playerHealth - selfDamage;
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - selfDamage);
                setPlayerSpecialUsed(true);
                console.log("player hit themselves for : " + selfDamage);
                // checkIfGameFinished();
                setTimeout(function () {
                    computerTurn()
                }, 2000)
            }
        } else {
            return null;
        }
    }

    const computerTurn = function () {

        const Attack1 = function () {
            let damage = 0;
            if (computerDa.daType === "BUFFDA") {
                damage = getRandomNumber(18, 30)
            } else if (computerDa.daType === "AVERAGEDA") {
                damage = getRandomNumber(23, 25)
            } else {
                damage = getRandomNumber(18, 25)
            }
            // const health = playerHealth - damage;
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth - damage)
            console.log("computer hit player for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            // const health = playerHealth - damage;
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth - damage);
            console.log("computer hit player for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Heal = function () {
            let heal = 0;
            if (computerDa.daType === "SOFTDA") {
                heal = getRandomNumber(23, 25)
            } else {
                heal = getRandomNumber(18, 25)
            }
            if ((computerHealth + heal) >= 100) {
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => 100);
            } else if (computerHealth <= 30) {
                heal = getRandomNumber(24, 25)
                // const health = computerHealth + heal;
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth + heal)
            } else {
                // const health = computerHealth + heal;
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth + heal)
            }
            console.log("computer healed for : " + heal);
            // checkIfGameFinished();
        }
        const Special = function () {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                // const health = playerHealth - opponentDamage;
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - opponentDamage);
                setComputerSpecialUsed(true);
                console.log("computer hit player for : " + opponentDamage);
                // checkIfGameFinished();
            } else if (specialOutcome[specialNumber] === selfDamage) {
                // const health = computerHealth - selfDamage;
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth - selfDamage);
                setComputerSpecialUsed(true);
                console.log("computer hit themselves for : " + selfDamage);
                // checkIfGameFinished();
            }
        }
        if (computerHealth >= 80) {
            if (computerSpecialUsed === false) {
                const randomMove = [Attack1, Attack2, Special]
                const randomNumber = Math.floor(Math.random() * 3);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            } else {
                const randomMove = [Attack1, Attack2]
                const randomNumber = Math.floor(Math.random() * 2);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            }
        } else if (computerHealth >= 60) {
            if (computerSpecialUsed === false) {
                const randomMove = [Attack1, Attack2, Heal, Special]
                const randomNumber = Math.floor(Math.random() * 4);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            } else {
                const randomMove = [Attack1, Attack2, Heal]
                const randomNumber = Math.floor(Math.random() * 3);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            }
        } else if (computerHealth >= 40) {
            if (computerSpecialUsed === false) {
                const randomMove = [Attack1, Attack2, Heal, Heal, Special]
                const randomNumber = Math.floor(Math.random() * 5);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            } else {
                const randomMove = [Attack1, Attack2, Heal, Heal]
                const randomNumber = Math.floor(Math.random() * 4);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            }
        } else if (computerHealth <= 30) {
            if (computerSpecialUsed === false) {
                const randomMove = [Attack1, Attack2, Heal, Heal, Heal, Heal, Special]
                const randomNumber = Math.floor(Math.random() * 7);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            } else {
                const randomMove = [Attack1, Attack2, Heal, Heal, Heal, Heal]
                const randomNumber = Math.floor(Math.random() * 6);
                setTimeout(function () {
                    randomMove[randomNumber]()
                }, 1000)
            }
        }
    };

    const showFist = function () {
        return <img src={`${process.env.PUBLIC_URL}/fist.gif`} height="200px" width="200px" />
    }


    if (gameFinished === false) {
        return (
            <>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/${playerDa.imgName}`} width="200" height="250"/>
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
                <img src={`${process.env.PUBLIC_URL}/${computerDa.imgName}`} width="220" height="250"/>
                    <ul>
                        <li className="health">{computerDa.name}</li>
                        <li className="health">{computerDa.bio}</li>
                        <li className="health">{computerDa.attackOneName}...  <button>ATTACK</button></li>
                        <li className="health">{computerDa.attackTwoName}...  <button>ATTACK</button></li>
                        <li className="health">{computerDa.healName}...  <button>HEAL</button></li>
                    </ul>

                    {previousComputerHealth > computerHealth ? 
                        <CountUp
                            className="countUpRed"
                            start={previousComputerHealth}
                            end={computerHealth}
                            duration="1"
                        /> : 
                            <CountUp
                            className="countUpGreen"
                            start={previousComputerHealth}
                            end={computerHealth}
                            duration="1"
                        />}
                </div>
            </>
        )
    } else {
        if (computerHealth <= 0) {
            return (
                <>
                    <div className="health">
                        <h1>{playerDa.name} smashed {computerDa.name}</h1>
                        <h2>You Win !</h2>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="health">
                        <h1>{computerDa.name} wrecked {playerDa.name}</h1>
                        <h2>You Lose !</h2>
                    </div>
                </>
            )
        }
    }
}

export default FightScreen;