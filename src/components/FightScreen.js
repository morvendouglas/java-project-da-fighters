import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import '../App.css'

const FightScreen = ({ playerDa, computerDa, onGameFinished }) => {

    const [computerHealth, setComputerHealth] = useState(20);
    const [previousComputerHealth, setPreviousComputerHealth] = useState(0);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [previousPlayerHealth, setPreviousPlayerHealth] = useState(0);
    const [computerSpecialUsed, setComputerSpecialUsed] = useState(false);
    const [playerSpecialUsed, setPlayerSpecialUsed] = useState(false);

    useEffect(() => {
        if (computerHealth <= 0 & playerHealth > 0) {
            onGameFinished(playerDa);
        } else if (playerHealth <= 0 & computerHealth > 0) {
            onGameFinished(computerDa);
        }
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
        setPreviousComputerHealth(computerHealth)
        setComputerHealth(computerHealth => computerHealth - damage)
        console.log("player hit computer for : " + damage);
        setTimeout(function () {
            computerTurn()
        }, 2000)
    }

    const handleAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        setPreviousComputerHealth(computerHealth)
        setComputerHealth(computerHealth => computerHealth - damage)
        console.log("player hit computer for : " + damage);
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
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        } else {
            const health = playerHealth + heal;
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth + heal)
        }
        console.log("player healed for : " + heal);
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
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth - opponentDamage);
                setPlayerSpecialUsed(true);
                playerDa.specialName = "Special Used"
                console.log("player hit computer for : " + opponentDamage);
                setTimeout(function () {
                    computerTurn()
                }, 2000)
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - selfDamage);
                setPlayerSpecialUsed(true);
                playerDa.specialName = "Special Used"
                console.log("player hit themselves for : " + selfDamage);
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
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth - damage)
            console.log("computer hit player for : " + damage);
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            setPreviousPlayerHealth(playerHealth)
            setPlayerHealth(playerHealth => playerHealth - damage);
            console.log("computer hit player for : " + damage);
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
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth + heal)
            } else {
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth + heal)
            }
            console.log("computer healed for : " + heal);
        }
        const Special = function () {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - opponentDamage);
                setComputerSpecialUsed(true);
                computerDa.specialName = "Special Used"
                console.log("computer hit player for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth - selfDamage);
                setComputerSpecialUsed(true);
                computerDa.specialName = "Special Used"
                console.log("computer hit themselves for : " + selfDamage);
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
        } else if (computerHealth <= 39) {
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

    return (
        <>
            <div>
                {playerDa.name}
                {/* <img src={`${process.env.PUBLIC_URL}/${playerDa.specialName}`} /> */}
                <ul>
                    <li><button onClick={handleAttack1Click}>{playerDa.attackOneName}</button></li>
                    <li><button onClick={handleAttack2Click}>{playerDa.attackTwoName}</button></li>
                    <li><button onClick={handleHealClick}>{playerDa.healName}</button></li>
                    <li><button onClick={handleSpecialClick}>{playerDa.specialName}</button></li>
                    <li><CountUp
                        className="health"
                        start={previousPlayerHealth}
                        end={playerHealth}
                        duration="1"
                    />
                    </li>
                </ul>
            </div>
            <div>
                {computerDa.name}
                <ul>
                    <li><button>{computerDa.attackOneName}</button></li>
                    <li><button>{computerDa.attackTwoName}</button></li>
                    <li><button>{computerDa.healName}</button></li>
                    <li><button>{computerDa.specialName}</button></li>
                    <li><CountUp
                        className="health"
                        start={previousComputerHealth}
                        end={computerHealth}
                        duration="1"
                    />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FightScreen;