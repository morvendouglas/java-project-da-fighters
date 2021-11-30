import React, { useState } from 'react';

const FightScreen = ({ playerDa, computerDa }) => {

    const [computerHealth, setComputerHealth] = useState(100);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [computerSpecialUsed, setComputerSpecialUsed] = useState(false);
    const [playerSpecialUsed, setPlayerSpecialUsed] = useState(false);

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
        const health = computerHealth - damage;
        setComputerHealth(health)
        console.log("player hit computer for : " + damage);
        computerTurn();
    }


    const handleAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        const health = computerHealth - damage;
        setComputerHealth(health);
        computerTurn();
        console.log("player hit computer for : " + damage);
    }


    const handleHealClick = function () {
        let heal = 0;
        if (playerDa.daType === "SOFTDA") {
            heal = getRandomNumber(23, 25)
        } else {
            heal = getRandomNumber(18, 25)
        }
        if ((playerHealth + heal) >= 100) {
            setPlayerHealth(100);
        } else if (playerHealth <= 30) {
            heal = getRandomNumber(24, 25)
            const health = playerHealth + heal;
            setPlayerHealth(health)
        } else {
            const health = playerHealth + heal;
            setPlayerHealth(health);
        }
        computerTurn();
        console.log("player healed for : " + heal);
    }

    const handleSpecialClick = function () {
        if (playerSpecialUsed === false) {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                const health = computerHealth - opponentDamage;
                setComputerHealth(health);
                setPlayerSpecialUsed(true);
                computerTurn();
                console.log("player hit computer for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                const health = playerHealth - selfDamage;
                setPlayerHealth(health);
                setPlayerSpecialUsed(true);
                computerTurn();
                console.log("player hit themselves for : " + selfDamage);
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
            const health = playerHealth - damage;
            setPlayerHealth(health)
            console.log("computer hit player for : " + damage);
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            const health = playerHealth - damage;
            setPlayerHealth(health);
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
                setComputerHealth(100);
            } else if (playerHealth <= 30) {
                heal = getRandomNumber(24, 25)
                const health = playerHealth + heal;
                setPlayerHealth(health)
            } else {
                const health = computerHealth + heal;
                setComputerHealth(health);
            }
            console.log("computer healed for : " + heal);
        }
        const Special = function () {
            let opponentDamage = 45;
            let selfDamage = 25;
            const specialOutcome = [opponentDamage, opponentDamage, selfDamage]
            const specialNumber = Math.floor(Math.random() * 3);
            if (specialOutcome[specialNumber] === opponentDamage) {
                const health = computerHealth - opponentDamage;
                setPlayerHealth(health);
                setComputerSpecialUsed(true);
                console.log("computer hit player for : " + opponentDamage);
            } else if (specialOutcome[specialNumber] === selfDamage) {
                const health = computerHealth - selfDamage;
                setComputerHealth(health);
                setComputerSpecialUsed(true);
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


    return (
        <>
            <div>
                {playerDa.name}
                <ul>
                    <li><button onClick={handleAttack1Click}>{playerDa.attackOneName}</button></li>
                    <li><button onClick={handleAttack2Click}>{playerDa.attackTwoName}</button></li>
                    <li><button onClick={handleHealClick}>{playerDa.healName}</button></li>
                    <li><button onClick={handleSpecialClick}>{playerDa.specialName}</button></li>
                    <li>{playerHealth}</li>
                </ul>
            </div>
            <div>
                {computerDa.name}
                <ul>
                    <li><button>{computerDa.attackOneName}</button></li>
                    <li><button>{computerDa.attackTwoName}</button></li>
                    <li><button>{computerDa.healName}</button></li>
                    <li><button>{computerDa.specialName}</button></li>
                    <li>{computerHealth}</li>
                </ul>
            </div>
        </>
    )

}

export default FightScreen;