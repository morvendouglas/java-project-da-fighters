import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import '../App.css'
import { getFID } from 'web-vitals';

const SimulationFightScreen = ({ computerDaOne, computerDaTwo, onGameFinished }) => {

    const [computerDaTwoHealth, setComputerDaTwoHealth] = useState(100);
    const [previousComputerDaTwoHealth, setPreviousComputerDaTwoHealth] = useState(0);
    const [computerDaOneHealth, setComputerDaOneHealth] = useState(100);
    const [previousComputerDaOneHealth, setPreviousComputerDaOneHealth] = useState(0);
    const [computerDaTwoSpecialUsed, setComputerDaTwoSpecialUsed] = useState(false);
    const [computerDaOneSpecialUsed, setComputerDaOneSpecialUsed] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [gif, setGif] = useState(false)

    useEffect(() => {
        if (computerDaTwoHealth <= 0 & computerDaOneHealth > 0) {
            onGameFinished(computerDaOne);
        } else if (computerDaOneHealth <= 0 & computerDaTwoHealth > 0) {
            onGameFinished(computerDaTwo);
        }
    }, [computerDaTwoHealth, computerDaOneHealth])

    const getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }

    const computerDaOneTurn = function () {
        const Attack1 = function () {
            let damage = 0;
            if (computerDaOne.daType === "BUFFDA") {
                damage = getRandomNumber(18, 30)
            } else if (computerDaOne.daType === "AVERAGEDA") {
                damage = getRandomNumber(23, 25)
            } else {
                damage = getRandomNumber(18, 25)
            }
            setPreviousComputerDaTwoHealth(computerDaTwoHealth)
            setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth - damage)
            console.log("computer one hit computer two for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            setPreviousComputerDaTwoHealth(computerDaTwoHealth)
            setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth - damage);
            console.log("computer one hit computer two for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Heal = function () {
            let heal = 0;
            if (computerDaOne.daType === "SOFTDA") {
                heal = getRandomNumber(23, 25)
            } else {
                heal = getRandomNumber(18, 25)
            }
            if ((computerDaOneHealth + heal) >= 100) {
                setPreviousComputerDaOneHealth(computerDaOneHealth)
                setComputerDaOneHealth(computerDaOneHealth => 100);
            } else if (computerDaOneHealth <= 30) {
                heal = getRandomNumber(24, 25)
                setPreviousComputerDaOneHealth(computerDaOneHealth)
                setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth + heal)
            } else {
                setPreviousComputerDaOneHealth(computerDaOneHealth)
                setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth + heal)
            }
            console.log("computer one healed for : " + heal);
        }
        const Special = function () {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                setPreviousComputerDaTwoHealth(computerDaTwoHealth)
                setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth - opponentDamage);
                setComputerDaOneSpecialUsed(true);
                computerDaOne.specialName = "Special Used"
                console.log("computer one hit computer two for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousComputerDaOneHealth(computerDaOneHealth)
                setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth - selfDamage);
                setComputerDaOneSpecialUsed(true);
                computerDaOne.specialName = "Special Used"
                console.log("computer one hit themselves for : " + selfDamage);
            }
        }
        if (computerDaOneHealth >= 80) {
            if (computerDaOneSpecialUsed === false) {
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
        } else if (computerDaOneHealth >= 60) {
            if (computerDaOneSpecialUsed === false) {
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
        } else if (computerDaOneHealth >= 40) {
            if (computerDaOneSpecialUsed === false) {
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
        } else if (computerDaOneHealth <= 39) {
            if (computerDaOneSpecialUsed === false) {
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
        computerDaTwoTurn();
    };

    const computerDaTwoTurn = function () {
        const Attack1 = function () {
            let damage = 0;
            if (computerDaTwo.daType === "BUFFDA") {
                damage = getRandomNumber(18, 30)
            } else if (computerDaTwo.daType === "AVERAGEDA") {
                damage = getRandomNumber(23, 25)
            } else {
                damage = getRandomNumber(18, 25)
            }
            setPreviousComputerDaOneHealth(computerDaOneHealth)
            setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth - damage)
            console.log("computer two hit computer one for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            setPreviousComputerDaOneHealth(computerDaOneHealth)
            setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth - damage);
            console.log("computer two hit computer one for : " + damage);
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
        }
        const Heal = function () {
            let heal = 0;
            if (computerDaTwo.daType === "SOFTDA") {
                heal = getRandomNumber(23, 25)
            } else {
                heal = getRandomNumber(18, 25)
            }
            if ((computerDaTwoHealth + heal) >= 100) {
                setPreviousComputerDaTwoHealth(computerDaTwoHealth)
                setComputerDaTwoHealth(computerDaTwoHealth => 100);
            } else if (computerDaTwoHealth <= 30) {
                heal = getRandomNumber(24, 25)
                setPreviousComputerDaTwoHealth(computerDaTwoHealth)
                setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth + heal)
            } else {
                setPreviousComputerDaTwoHealth(computerDaTwoHealth)
                setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth + heal)
            }
            console.log("computer two healed for : " + heal);
        }
        const Special = function () {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                setPreviousComputerDaOneHealth(computerDaOneHealth)
                setComputerDaOneHealth(computerDaOneHealth => computerDaOneHealth - opponentDamage);
                setComputerDaTwoSpecialUsed(true);
                computerDaTwo.specialName = "Special Used"
                console.log("computer two hit computer one for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousComputerDaTwoHealth(computerDaTwoHealth)
                setComputerDaTwoHealth(computerDaTwoHealth => computerDaTwoHealth - selfDamage);
                setComputerDaTwoSpecialUsed(true);
                computerDaTwo.specialName = "Special Used"
                console.log("computer two hit themselves for : " + selfDamage);
            }
        }
        if (computerDaTwoHealth >= 80) {
            if (computerDaTwoSpecialUsed === false) {
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
        } else if (computerDaTwoHealth >= 60) {
            if (computerDaTwoSpecialUsed === false) {
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
        } else if (computerDaTwoHealth >= 40) {
            if (computerDaTwoSpecialUsed === false) {
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
        } else if (computerDaTwoHealth <= 39) {
            if (computerDaTwoSpecialUsed === false) {
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

                <div className="fight_bg">
                    <div>
                    <img src={`${process.env.PUBLIC_URL}/${computerDaOne.imgName}`} className="DaFightImg" />
                    <ul>
                        <li className="name">{computerDaOne.name}</li>
                        <li className="bio">{computerDaOne.bio}</li>
                        <li className="attack1">{computerDaOne.attackOneName}...</li>
                        <li className="attack2">{computerDaOne.attackTwoName}...</li>
                        <li className="heal">{computerDaOne.healName}...</li>
                    </ul>
                    <div className="playerCountUp">
                    {previousComputerDaOneHealth > computerDaOneHealth ?
                        <CountUp
                           className="countUpRedP1"
                            start={previousComputerDaOneHealth}
                            end={computerDaOneHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreenP1"
                            start={previousComputerDaOneHealth}
                            end={computerDaOneHealth}
                            duration="1"
                        />}
                          </div>
                </div>
                <div className="gif">
                <button onClick={computerDaOneTurn}>FIGHT</button>
                {gif === true ? showFist() : null}
                </div>
                <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/${computerDaTwo.imgName}`} className="CPUImage" />
                    <ul>
                        <li className="CPUName">{computerDaTwo.name}</li>
                        <li className="CPUBio">{computerDaTwo.bio}</li>
                        <li className="CPUAttack1">{computerDaTwo.attackOneName}...</li>
                        <li className="CPUAttack2">{computerDaTwo.attackTwoName}...</li>
                        <li className="CPUHeal">{computerDaTwo.healName}...</li>
                    </ul>
                    <div className="playerCountUp">
                    {previousComputerDaTwoHealth > computerDaTwoHealth ?
                        <CountUp
                            className="countUpRedCPU"
                            start={previousComputerDaTwoHealth}
                            end={computerDaTwoHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreenCPU"
                            start={previousComputerDaTwoHealth}
                            end={computerDaTwoHealth}
                            duration="1"
                        />}
                        </div>
                    </div>
                </div>
                </div>
            
    
        )
    } else {
        if (computerDaTwoHealth <= 0) {
            return (
                <>
                    <div className="health">
                        <h1>{computerDaTwo.name} smashed {computerDaTwo.name}</h1>
                        <h2>Computer One Wins !</h2>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="health">
                        <h1>{computerDaTwo.name} wrecked {computerDaOne.name}</h1>
                        <h2>Computer Two Wins !</h2>
                    </div>
                </>
            )
        }
    }
}

export default SimulationFightScreen