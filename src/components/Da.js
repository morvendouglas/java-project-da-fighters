import React from 'react';

const Da = ({ da, onDaClicked }) => {


  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
      <button onClick={handleClick}>{da.name}</button>
    </>
  )
}

export default Da;