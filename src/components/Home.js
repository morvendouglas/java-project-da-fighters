import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Home = () => {

    const playAudio = function () {
        let audio = new Audio("/main_page_screen.wav")
        audio.play();
    }

    return (
        <div>
            <img onClick={playAudio} className="main_logo" height="600" src={`${process.env.PUBLIC_URL}/logo.gif`} />
            <div>
                <a href="/mode">
                    <img className="press_start" height="100" src={`${process.env.PUBLIC_URL}/press_start.gif`} />
                </a>
            </div>
        </div>

    )
}

export default Home;