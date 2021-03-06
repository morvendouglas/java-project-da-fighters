import React from 'react';
import '../App.css'

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
    <div >
      <img className = "flex-item" src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}/>
      </div>
    </>
   
  )
}

export default Da;