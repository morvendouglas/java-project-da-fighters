import React, { useState } from 'react';

const CreateADa = ({ handlePost }) => {

    // cant get daType in a select to  work with daForm

    const [stateDa, setStateDa] = useState(
        {
            "name": "",
            "bio": "",
            "daType": "BUFFDA",
            "attackOneName": "",
            "attackTwoName": "",
            "healName": "",
            "imgName": "",
            "startingHealth": 100,
            "currentHealth": 100,
            "points": 0
        }
    )

    const handleClick = function (event) {
        let propertyName = event.target.name;
        let copiedDa = { ...stateDa }
        const daImg1 = "obama.jpg"
        const daImg2 = "jackie-chan.jpg"
        const daImg3 = "ned.jpg"
        const randomDaImg = [daImg1, daImg2, daImg3]
        const randomNumber = Math.floor(Math.random() * 3);
        copiedDa[propertyName] = randomDaImg[randomNumber]
        setStateDa(copiedDa)
    }

    const handleChange = function (event) {
        let propertyName = event.target.name;
        let copiedDa = { ...stateDa }
        copiedDa[propertyName] = event.target.value;
        setStateDa(copiedDa)
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        handlePost(stateDa); 
    }

    return (
        <>
            <h3>Create A Da</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={handleChange} value={stateDa.name} />
                <input type="text" placeholder="Bio" name="bio" onChange={handleChange} value={stateDa.bio} />
                <input type="text" placeholder="First Attack" name="attackOneName" onChange={handleChange} value={stateDa.attackOneName} />
                <input type="text" placeholder="Second Attack" name="attackTwoName" onChange={handleChange} value={stateDa.attackTwoName} />
                <input type="text" placeholder="Heal" name="healName" onChange={handleChange} value={stateDa.healName} />
                <label for="imgName" className="health">Click for your da's photo</label>
                <input type="radio" id="imgName" name="imgName" value={stateDa.imgName}onClick={handleClick}></input>
                <button type ="submit">Save</button>
            </form>
        </>

    )
}


export default CreateADa;