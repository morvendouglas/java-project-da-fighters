import React, { useState } from 'react';
import '../CreateADa.css'

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
            "imgName": "11.png",
            "startingHealth": 100,
            "currentHealth": 100,
            "points": 0
        }
    )

    // const handleClick = function (event) {
    //     let propertyName = event.target.name;
    //     let copiedDa = { ...stateDa }
    //     const daImg1 = "11.png"
    //     const daImg2 = "12.png"
    //     const daImg3 = "13.png"
    //     const randomDaImg = [daImg1, daImg2, daImg3]
    //     const randomNumber = Math.floor(Math.random() * 3);
    //     copiedDa[propertyName] = randomDaImg[randomNumber]
    //     setStateDa(copiedDa)
    // }

    const handleClick = function (event) {
        let propertyName = event.target.name;
        let copiedDa = { ...stateDa }
        const daImg1 = "11.png"
        copiedDa[propertyName] = daImg1
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
        <div className="first">
           <img className="img" src={`${process.env.PUBLIC_URL}/DA.png`} onClick={handleClick} height="400px" width="700px"/>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="⚡ Da Name" name="name" className="input" onChange={handleChange} value={stateDa.name} />
                <input type="text" placeholder="⚡ Bio" name="bio" className="input" onChange={handleChange} value={stateDa.bio} />
                <input type="text" placeholder="⚡ First Attack Name" className="input" name="attackOneName" onChange={handleChange} value={stateDa.attackOneName} />
                <input type="text" placeholder="⚡ Second Attack Name" className="input" name="attackTwoName" onChange={handleChange} value={stateDa.attackTwoName} />
                <input type="text" placeholder="⚡ Heal Name" name="healName" className="input" onChange={handleChange} value={stateDa.healName} />
                {/* <label for="imgName" className="label">Click for da photo ->></label> */}
                {/* <input type="radio" className="radio" name="imgName"  value={stateDa.imgName} onClick={handleClick}></input> */}
                <button type="submit" className="submit">Save</button>
            </form>
        </div>
        </>

    )
}


export default CreateADa;
