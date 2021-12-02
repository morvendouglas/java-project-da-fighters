import React from 'react';
import Da from './Da';
import { Link } from 'react-router-dom';

const DaList = ({ das, onDaClicked }) => {

	const dasNodes = das.map((da, index) => {
		return (
			<li key={index}>
				<Da da={da} key={index} onDaClicked={onDaClicked}/>
			</li>
		)
	})

	return (
		<div >
		<ul>
			{dasNodes}
		</ul>
		<Link to="/fight"><button type="button">Fight</button></Link>

		</div>
	)
}
export default DaList;