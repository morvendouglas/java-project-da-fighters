import React from 'react';

const PlayerTwoDa = ({ da, onPlayerTwoDaClicked }) => {
  

  const handleClick = function(){
    onPlayerTwoDaClicked(da)
  }

  return (
    <>
      {/* <button onClick={handleClick}>{da.name}</button> */}
      <img src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}  width="280" height="350"/>
    </>
  )
}

export default PlayerTwoDa;