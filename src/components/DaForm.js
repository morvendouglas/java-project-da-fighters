import React, {useState} from 'react';
import Request from '../helpers/request';

const DaForm = ({handlePost}) => {

    const [stateDa, setStateDa] = useState(
        {
            "name": "",
            "daType": "BUFFDA",
            "attackOneName": "Buff Attack One",
            "attackTwoName": "Buff Attack Two",
            "specialName": "Buff Special Attack",
            "startingHealth": 100,
            "currentHealth": 100
        }
    )

    const handleChange = function(event){
        let propertyName = event.target.name;
        let copiedDa = {...stateDa}
        copiedDa[propertyName] = event.target.value;
        setStateDa(copiedDa)
    }

    const handleSubmit = function(event){
        event.preventDefault();
        handlePost(stateDa); 
    }

    return(
        <>
        <h3>Create A Da</h3>
        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Name" name="name" onChange={handleChange} value={stateDa.name} />

            {/* <input type="text" placeholder="Bio" name="bio" onChange={handleChange} value={stateDa.bio} /> */}
            {/* <input class="photo-upload" type="file" onchange="readURL{this}" accept="Image/" onChange={handleChange} value={stateDa.photo} /> */}


            <button type="submit">Save</button>
        </form>
        </>
  
    )
}


export default DaForm;