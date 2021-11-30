import React from "react";


const Home = () => {
    return(		
        <>
	<img className="main_logo" height="600" src={`${process.env.PUBLIC_URL}/logo.gif`}  />
      <div>
        <a href="/select">
        <img className="press_start" height="100" src={`${process.env.PUBLIC_URL}/press_start.gif`}  />
        </a>
      </div>
</>
    )}

export default Home;