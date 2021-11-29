import React from 'react';
import Da from './Da';

const DaList = ({ das }) => {

	const dasNodes = das.map((da, index) => {
		return (
			<li key={index}>
				<Da da={da} />
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