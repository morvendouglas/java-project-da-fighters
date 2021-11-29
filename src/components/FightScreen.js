import React, { useState } from 'react';

const FightScreen = ({ playerDa, computerDa }) => {

    const [computerHealth, setComputerHealth] = useState(100);
    const [playerHealth, setPlayerHealth] = useState(100);

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
        const health = computerDa.currentHealth -= damage;
        setComputerHealth(health)
        console.log("player hit computer for : " + damage);
        computerTurn();
    }


    const handleAttack2Click = function () {
        let damage = getRandomNumber(10, 35);
        const health = computerDa.currentHealth -= damage;
        setComputerHealth(health);
        computerTurn();
        console.log("player hit computer for : " + damage);
    }


    const handleHeal = function () {
        let heal = 0;
        if (playerDa.daType === "SOFTDA") {
            heal = getRandomNumber(23, 25)
        } else {
            heal = getRandomNumber(18, 25)
        }
        if ((playerDa.currentHealth + heal) >= 100) {
            setPlayerHealth(100);
        } else {
            const health = playerDa.currentHealth += heal;
            setPlayerHealth(health);
        }
        computerTurn();
        console.log("player healed for : " + heal);
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
            const health = playerDa.currentHealth -= damage;
            setPlayerHealth(health)
            console.log("computer hit player for : " + damage);
        }
        const Attack2 = function () {
            let damage = getRandomNumber(10, 35);
            const health = playerDa.currentHealth -= damage;
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
            if ((computerDa.currentHealth + heal) >= 100) {
                setComputerHealth(100);
            } else {
                const health = computerDa.currentHealth += heal;
                setComputerHealth(health);
            }
            console.log("computer healed for : " + heal);
        }

        const randomMove = [Attack1, Attack2, Heal]
        const randomNumber = Math.floor(Math.random() * 3);
        setTimeout(function () {
            randomMove[randomNumber]()
        }, 1000)
    };


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
                    <li><button>{computerDa.healName}</button></li>
                    <li><button>{computerDa.specialName}</button></li>
                    <li>{computerHealth}</li>
                </ul>
            </div>
        </>
    )

}

export default FightScreen;