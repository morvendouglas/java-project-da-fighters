import React from 'react';

const PlayerTwoDa = ({ da, onPlayerTwoDaClicked }) => {
  

  const handleClick = function(){
    onPlayerTwoDaClicked(da)
  }

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/${da.imgName}`} className="flex-multiplayer-item" onClick={handleClick}  width="280" height="350"/>
    </>
  )
}

export default PlayerTwoDa;