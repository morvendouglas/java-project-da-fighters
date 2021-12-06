import React from 'react';
import '../App.css'

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/${da.imgName}`} alt="fighter-da" onClick={handleClick}  width="280" height="350"/>
    </>
  )
}

export default Da;