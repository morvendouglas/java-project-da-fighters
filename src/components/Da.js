import React from 'react';

const Da = ({da}) => {

  if (!da){
    return <p>Loading...</p>
  }

  return (
    <>
    {da.name}
    </>
  )
}

export default Da;