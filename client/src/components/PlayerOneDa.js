import React from 'react';
import '../App.css'

const PlayerOneDa = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
    <div >
      <img className = "flex-multiplayer-item" src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}/>
      </div>
    </>
   
  )
}

export default PlayerOneDa;