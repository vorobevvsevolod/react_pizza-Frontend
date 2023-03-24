import React from 'react';
import './orangeButton.scss'

type OrangeButtonProps = {
    width?: string | null
    title: string
    onClick?: any | null
}
const OrangeButton:React.FC<OrangeButtonProps> = ({ width, title, onClick}) => {
	return (
		<button style={{width: (width) ? width : '100%'}} className='buttonAdd' onClick={onClick}>
			<span className='buttonAdd_span'>
				{title}
			</span>
		</button>
	);
};

export default OrangeButton;