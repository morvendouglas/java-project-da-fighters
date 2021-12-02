import React from 'react';

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
      {/* <button onClick={handleClick}>{da.name}</button> */}
      <img src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}  width="280" height="350"/>
    </>
  )
}

export default Da;