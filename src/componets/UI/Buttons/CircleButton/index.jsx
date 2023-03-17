import React from 'react';
import styles from './styles.module.scss'
const CircleButton = ({ text, onClick, active, arrowLeft, arrowRight }) => {
	return (
		<button className={`${styles.button}  ${(active) ? styles.button_active : ''}`} onClick={onClick}>
			{text}
			{ (arrowLeft) ? <img className={styles.img_left} width={14} height={14} src="/img/arrow.svg" alt=""/> : '' }
			{ (arrowRight) ? <img className={styles.img_right} width={14} height={14} src="/img/arrow.svg" alt=""/> : '' }
		</button>
	);
};

export default CircleButton;