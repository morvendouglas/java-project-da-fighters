import React from 'react';

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}  width="280" height="350"/>
    </>
  )
}

export default Da;