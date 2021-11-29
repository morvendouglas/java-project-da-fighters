import React from 'react';

const Da = ({ da }) => {

  if (!da) {
    return <p>Loading...</p>
  }

  return (
    <>
      <button>{da.name}</button>
    </>
  )
}

export default Da;