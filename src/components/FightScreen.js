import React, { useState } from 'react';

const FightScreen = ({ playerDa, computerDa }) => {

    const [computerHealth, setComputerHealth] = useState(100);
    const [playerHealth, setPlayerHealth] = useState(100);


    const getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }

    const handleAttack1Click = function () {
        if (playerDa.daType === "BUFFDA") {
            const health = computerDa.currentHealth -= getRandomNumber(18, 30)
            setComputerHealth(health);
        } else if (playerDa.daType === "AVERAGEDA") {
            const health = computerDa.currentHealth -= getRandomNumber(23, 25)
            setComputerHealth(health);
        } else {
            const health = computerDa.currentHealth -= getRandomNumber(18, 25)
            setComputerHealth(health);
        }
        computerTurn();
    }

    const handleAttack2Click = function () {
        const health = computerDa.currentHealth -= getRandomNumber(10, 35)
        setComputerHealth(health);
        computerTurn();
    }

    const handleHeal = function () {
        if (playerDa.daType === "SOFTDA") {
            const health = playerDa.currentHealth += getRandomNumber(23, 25)
            setPlayerHealth(health);
        } else {
            const health = playerDa.currentHealth += getRandomNumber(18, 25)
            setPlayerHealth(health);
        }
        computerTurn();
    }

    const computerTurn = function () {
        const Attack1 = function () {
            if (computerDa.daType === "BUFFDA") {
                const health = playerDa.currentHealth -= getRandomNumber(18, 30)
                setPlayerHealth(health);
            } else if (computerDa.daType === "AVERAGEDA") {
                const health = playerDa.currentHealth -= getRandomNumber(23, 25)
                setPlayerHealth(health);
            } else {
                const health = playerDa.currentHealth -= getRandomNumber(18, 25)
                setPlayerHealth(health);
            }
        }
        const Attack2 = function () {
            const health = playerDa.currentHealth -= getRandomNumber(10, 35)
            setPlayerHealth(health);
        }
        const Heal = function () {
            if (computerDa.daType === "SOFTDA") {
                const health = computerDa.currentHealth += getRandomNumber(23, 25)
                setComputerHealth(health);
            } else {
                const health = computerDa.currentHealth += getRandomNumber(18, 25)
                setComputerHealth(health);
            }
        }
        const randomMove = [Attack1, Attack2, Heal]
        const randomNumber = Math.floor(Math.random() * 3);
        setTimeout(function() {
            randomMove[randomNumber]()}, 1000);
    }


    return (
        <>
            <div>
                {playerDa.name}
                <ul>
                    <li><button onClick={handleAttack1Click}>{playerDa.attackOneName}</button></li>
                    <li><button onClick={handleAttack2Click}>{playerDa.attackTwoName}</button></li>
                    <li><button onClick={handleHeal}>{playerDa.healName}</button></li>
                    <li><button>{playerDa.specialName}</button></li>
                    <li>{playerHealth}</li>
                </ul>
            </div>
            <div>
                {computerDa.name}
                <ul>
                    <li><button>{computerDa.attackOneName}</button></li>
                    <li><button>{computerDa.attackTwoName}</button></li>
                    <li><button>{computerDa.specialName}</button></li>
                    <li>{computerHealth}</li>
                </ul>
            </div>
        </>
    )

}

export default FightScreen;