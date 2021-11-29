import React, { useState } from 'react';

const DaForm = ({ handlePost }) => {

    const [stateDa, setStateDa] = useState(
        {
            "name": "",
            "daType": "",
            "attackOneName": "",
            "attackTwoName": "",
            "specialName": "",
            "startingHealth": 100,
            "currentHealth": 100,
            "photo": "",
            "bio": ""
        }
    )

    console.log(stateDa)

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
                <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handleChange} enctype="multipart/form-data"/>
                <select name="daType" onChange={handleChange} value={stateDa.daType} >
                    <option defaultValue='select-a-da-type'>Select a Da Type</option>
                    <option value="BUFFDA">BUFF DA</option>
                    <option value="AVERAGEDA">AVEREGE DA</option>
                    <option value="SOFDA">SOFT DA</option>
                </select>
                <input type="text" placeholder="First Attack" name="attackOneName" onChange={handleChange} value={stateDa.attackOneName} />
                <input type="text" placeholder="Second Attack" name="attackTwoName" onChange={handleChange} value={stateDa.attackTwoName} />
                <input type="text" placeholder="Special Attack" name="specialName" onChange={handleChange} value={stateDa.specialName} />
                <button type ="submit">Save</button>
            </form>
        </>

    )
}


export default DaForm;