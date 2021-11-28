import React from 'react';
import Da from './Da';

const DaList = ({das}) => {

	const dasNodes = das.map((da, index) => {
	  return (
	    <li key={index}>
	    <div>
	    <Da da={da} />
	    </div>
	    </li>
	  )
	})

	return (
	  <ul>
	    {dasNodes}
	  </ul>
	)
}
 export default DaList;