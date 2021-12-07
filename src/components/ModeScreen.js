import React from "react";
import { Link } from 'react-router-dom';

const ModeScreen = () => {

    return (
        <div>
            <Link to="/select"> <img className="fight_button" src={`${process.env.PUBLIC_URL}/pvc.png`}></img> </Link>
            <Link to="/multiplayer"> <img className="fight_button" src={`${process.env.PUBLIC_URL}/pvp.png`}></img> </Link>
            <Link to="/simulation"> <img className="fight_button" src={`${process.env.PUBLIC_URL}/cvc.png`}></img> </Link>

        </div>
    )
}

export default ModeScreen