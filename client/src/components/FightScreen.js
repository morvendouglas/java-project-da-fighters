import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import '../App.css'
import '../FightScreen.css'


const FightScreen = ({ playerDa, computerDa, onGameFinished, das }) => {

    const [computerHealth, setComputerHealth] = useState(100);
    const [previousComputerHealth, setPreviousComputerHealth] = useState(0);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [previousPlayerHealth, setPreviousPlayerHealth] = useState(0);
    const [computerSpecialUsed, setComputerSpecialUsed] = useState(false);
    const [playerSpecialUsed, setPlayerSpecialUsed] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [gif, setGif] = useState(false)
    const [leftGif, setLeftGif] = useState(false)
    const [rightGif, setRightGif] = useState(false)
    const [healGif, setHealGif] = useState(false)
    const [stunGif, setStunGif] = useState(false)
    const [missedGif, setMissedGif] = useState(false)


    useEffect(() => {
        if (computerHealth <= 0 & playerHealth > 0) {
            onGameFinished(playerDa);
        } else if (playerHealth <= 0 & computerHealth > 0) {
            onGameFinished(computerDa);
        }
    }, [computerHealth, playerHealth])

    const playAudio = function () {
        let music = new Audio("/game_music.wav")
        music.play()
    }

    const playSound = function () {
        let audio1 = new Audio("/sound1.wav")
        let audio2 = new Audio("/sound2.wav")
        const randomAudio = [audio1, audio2]
        const randomNumber = Math.floor(Math.random() * 2);
        const chosenSound = randomAudio[randomNumber]
        chosenSound.play()
    };

    const playComputerSound = function () {
        let audio3 = new Audio("/sound3.wav")
        let audio4 = new Audio("/sound4.wav")
        const randomAudio = [audio3, audio4]
        const randomNumber = Math.floor(Math.random() * 2);
        const chosenSound = randomAudio[randomNumber]
        chosenSound.play()
    };

    const playHeal = function () {
        let healAudio = new Audio("/nectar.wav")
        healAudio.play()
    }

    const playSpecial = function () {
        let specialSound = new Audio("/dadouken.wav")
        specialSound.play()
    }

    const playSpecialFail = function () {
        let specialFailSound = new Audio("/fail.wav")
        specialFailSound.play()
    }

    const playMiss = function () {
        let missSound = new Audio("/miss.wav")
        missSound.play()
    }

    const getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }

    const getMissChance = function () {
        let hit = true
        let miss = false
        const missChance = [hit, hit, hit, hit, hit, hit, hit, hit, hit, miss]
        const randomNumber = Math.floor(Math.random() * 10)
        const missOutcome = missChance[randomNumber]
        return missOutcome;
    }

    const getMissChanceHeavy = function () {
        let hit = true
        let miss = false
        const missChance = [hit, hit, hit, miss]
        const randomNumber = Math.floor(Math.random() * 4)
        const missOutcome = missChance[randomNumber]
        return missOutcome;
    }

    const handleAttack1Click = function () {
        if (getMissChance() === true) {
            console.log(getMissChance());
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
            playSound()
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
            setTimeout(function () {
                computerTurn()
            }, 2000)
        } else {
            playMiss()
            setMissedGif(true)
                setTimeout(function () {
                    setMissedGif(false)
                }, 1500)
            setTimeout(function () {
                computerTurn()
            }, 2000)
        }
    }

    const handleAttack2Click = function () {
        if (getMissChanceHeavy() === true) {
            let damage = getRandomNumber(10, 35);
            setPreviousComputerHealth(computerHealth)
            setComputerHealth(computerHealth => computerHealth - damage)
            console.log("player hit computer for : " + damage);
            playSound()
            // checkIfGameFinished();
            setGif(true)
            setTimeout(function () {
                setGif(false)
            }, 1500)
            setTimeout(function () {
                computerTurn()
            }, 2000)
        } else {
            playMiss()
            setMissedGif(true)
                setTimeout(function () {
                    setMissedGif(false)
                }, 1500)
            setTimeout(function () {
                computerTurn()
            }, 2000)
        }
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

        playHeal()
        console.log("player healed for : " + heal);
        setHealGif(true)
        setTimeout(function () {
            setHealGif(false)
        }, 2000)
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
                setLeftGif(true)
                setTimeout(function () {
                    setLeftGif(false)
                }, 2500)
                playSpecial();
                setTimeout(function () {
                    computerTurn()
                }, 2000)
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - selfDamage);
                setPlayerSpecialUsed(true);
                playerDa.specialName = "Special Used"
                console.log("player hit themselves for : " + selfDamage);
                playSpecialFail();
                setStunGif(true)
                setTimeout(function () {
                    setStunGif(false)
                }, 2500)
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
            if (getMissChance === true) {
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
                // checkIfGameFinished();
                setGif(true)
                setTimeout(function () {
                    setGif(false)
                }, 1500)
                playComputerSound()
            }else{
                playMiss()
                setMissedGif(true)
                setTimeout(function () {
                    setMissedGif(false)
                }, 1500)
            }
        }
        const Attack2 = function () {
            if (getMissChanceHeavy === true) {
                let damage = getRandomNumber(10, 35);
                setPreviousPlayerHealth(playerHealth)
                setPlayerHealth(playerHealth => playerHealth - damage);
                console.log("computer hit player for : " + damage);
                // checkIfGameFinished();
                setGif(true)
                setTimeout(function () {
                    setGif(false)
                }, 1500)
                playComputerSound()
            }else{
                playMiss()
                setMissedGif(true)
                setTimeout(function () {
                    setMissedGif(false)
                }, 1500)
            }
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
            setHealGif(true)
            setTimeout(function () {
                setHealGif(false)
            }, 1500)
            playHeal();
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
                playSpecial();
                setRightGif(true)
                setTimeout(function () {
                    setRightGif(false)
                }, 2500)
            } else if (specialOutcome[specialNumber] === selfDamage) {
                setPreviousComputerHealth(computerHealth)
                setComputerHealth(computerHealth => computerHealth - selfDamage);
                setComputerSpecialUsed(true);
                computerDa.specialName = "Special Used"
                console.log("computer hit themselves for : " + selfDamage);
                playSpecialFail();
                setStunGif(true)
                setTimeout(function () {
                    setStunGif(false)
                }, 2500)
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

    const showGifLeft = function () {
        const daImg2 = "left2.gif"
        const daImg3 = "left3.gif"
        const randomDaImg = [daImg2, daImg3]
        const randomNumber = Math.floor(Math.random() * 2);
        const img = randomDaImg[randomNumber]
        return <img src={`${process.env.PUBLIC_URL}/${img}`} alt="fist" height="180px" width="180px" />
    }

    const showGifRight = function () {
        const daImg1 = "right1.gif"
        const daImg2 = "right2.gif"
        const daImg3 = "right3.gif"
        const randomDaImg = [daImg1, daImg2, daImg3]
        const randomNumber = Math.floor(Math.random() * 3);
        const img = randomDaImg[randomNumber]
        return <img src={`${process.env.PUBLIC_URL}/${img}`} alt="fist" height="180px" width="180px" />
    }

    const showFist = function () {
        return <img src={`${process.env.PUBLIC_URL}/fist.gif`} alt="fist" height="180px" width="180px" />
    }

    const showHeal = function () {
        return <img src={`${process.env.PUBLIC_URL}/nectar.gif`} alt="fist" height="180px" width="180px" />
    }

    const showStun = function () {
        return <img src={`${process.env.PUBLIC_URL}/balrog-diz.gif`} alt="fist" height="180px" width="180px" />
    }

    const showCross = function () {
        return <img src={`${process.env.PUBLIC_URL}/giphy.gif`} alt="fist" height="180px" width="180px" />
    }



    if (gameFinished === false) {
        return (
            <div className="fight_bg" onLoad={playAudio} >
                {das.length < 2 ?
                    <div>
                        <h1 className="health">FINAL ROUND</h1>
                    </div>
                    :
                    <div></div>}
                <div>
                    <img className="DaFightImg" src={`${process.env.PUBLIC_URL}/${playerDa.imgName}`} width="200" height="200" />
                    <ul className="DaDetails">
                        <li className="name">{playerDa.name}</li>
                        <li className="bio">{playerDa.bio}</li>
                        <li className="attack1">{playerDa.attackOneName}<button onClick={handleAttack1Click}>ATTACK</button></li>
                        <li className="attack2">{playerDa.attackTwoName}<button onClick={handleAttack2Click}>ATTACK</button></li>
                        <li className="heal">{playerDa.healName}<button onClick={handleHealClick}>HEAL</button></li>
                    </ul>
                        <button onClick={handleSpecialClick} className="special" ></button>
                        <div className="playerCountUp">
                    {previousPlayerHealth > playerHealth ?

                        <CountUp
                            className="countUpRedP1"
                            start={previousPlayerHealth}
                            end={playerHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreenP1"
                            start={previousPlayerHealth}
                            end={playerHealth}
                            duration="1"
                        />}
                        </div>
                </div>
                <div className="gif">
                {leftGif === true ? showGifLeft() : null}
                {rightGif === true ? showGifRight() : null}
                {healGif === true ? showHeal() : null}
                {gif === true ? showFist() : null}
                {stunGif === true ? showStun() : null}
                {missedGif === true ? showCross() : null}
                </div>
                <div> 
                    <img className="CPUImage" src={`${process.env.PUBLIC_URL}/${computerDa.imgName}`} alt="da-fighter" />
                    <ul className="DaDetails">
                        <li className="CPUName">{computerDa.name}</li>
                        <li className="CPUBio">{computerDa.bio}</li>
                        <li className="CPUAttack1">{computerDa.attackOneName}  <button>ATTACK</button></li>
                        <li className="CPUAttack2">{computerDa.attackTwoName}  <button>ATTACK</button></li>
                        <li className="CPUHeal">{computerDa.healName}  <button>HEAL</button></li>
                    </ul>
                    <div className="computerCountUp">

                    {previousComputerHealth > computerHealth ?
                        <CountUp
                            className="countUpRedCPU"
                            start={previousComputerHealth}
                            end={computerHealth}
                            duration="1"
                        /> :
                        <CountUp
                            className="countUpGreenCPU"
                            start={previousComputerHealth}
                            end={computerHealth}
                            duration="1"
                        />}
                        </div>
                    </div>
                </div>
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