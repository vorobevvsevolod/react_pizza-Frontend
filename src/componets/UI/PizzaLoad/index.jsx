import React from 'react';
import styles from "./styles.module.scss";

const PizzaLoad = () => {
	return (
		<div className={styles.wrapper} >
			<div className={styles.pizzaBlock}>
				<img className={styles.image}
					src='/img/pizzaLoad.svg'
					alt="Pizza"
					width={280}
					height={280}
				/>
				<div className={styles.title}></div>
				
				<div className={styles.text}></div>
				
				<div className={styles.bottom}>
					<div className={styles.bottom_price}></div>
					<div className={styles.bottom_button}></div>
				</div>
				
			</div>
		</div>
	);
};

export default PizzaLoad;