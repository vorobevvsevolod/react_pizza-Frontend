import React from 'react';
import './orangeButton.scss'
const OrangeButton = (props) => {
	return (
		<button className='buttonAdd' onClick={props.onClick}>
			<span className='buttonAdd_span'>
				{props.title}
			</span>
		</button>
	);
};

export default OrangeButton;