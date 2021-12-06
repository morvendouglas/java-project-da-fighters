import React from "react";
import ReactAudioPlayer from "react-audio-player";


const audio = new Audio('public/home_page.mp3');
audio.play();


const Home = () => {
    return (
        <>
            <img className="main_logo" height="600" src={`${process.env.PUBLIC_URL}/logo.gif`} />
            <div>
                <a href="/mode">
                    <img className="press_start" height="100" src={`${process.env.PUBLIC_URL}/press_start.gif`} />
                </a>
            </div>
            <ReactAudioPlayer className="audio_player" src="intro.mp3" autoplay controls />

        </>

    )
}



export default Home;