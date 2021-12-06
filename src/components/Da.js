import React from 'react';

const Da = ({ da, onDaClicked }) => {
  

  const handleClick = function(){
    onDaClicked(da)
  }

  return (
    <>
    <div >
      {/* <button onClick={handleClick}>{da.name}</button> */}
      <img className = "flex-item" src={`${process.env.PUBLIC_URL}/${da.imgName}`} onClick={handleClick}/>
      </div>
    </>
   
  )
}

export default Da;