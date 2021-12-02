import React from 'react';

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
    <div className = "flex-container">
      {/* <button onClick={handleClick}>{da.name}</button> */}
      <img className = "flex-item" src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}  width="280" height="350"/>
      </div>
    </>
   
  )
}

export default Da;