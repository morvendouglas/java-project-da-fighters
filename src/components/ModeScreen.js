import React from "react";
import { Link } from 'react-router-dom';

const ModeScreen = () => {

    return (
        <div>
            <h1 className="health">This is the ModeScreen</h1>
            <Link to="/select"><button type="button">Single Player</button></Link>
            <Link to="/multiplayer"><button type="button">Multiplayer</button></Link>
        </div>
    )
}

export default ModeScreen