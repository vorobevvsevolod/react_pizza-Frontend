import React from 'react';
import './orangeButton.scss'

type OrangeButtonProps = {
    width?: string | null
    title: string
    onClick?: any | null,
	disabled?: boolean
}
const OrangeButtonUI:React.FC<OrangeButtonProps> = ({ width, title, onClick, disabled}) => {
	return (
		<button style={{width: (width) ? width : '100%'}} className={`buttonAdd ${disabled ?  'buttonAdd_disabled': 'buttonAdd_active'}`} onClick={onClick} disabled={disabled}>
			<span className='buttonAdd_span'>
				{title}
			</span>
		</button>
	);
};

export default OrangeButtonUI;