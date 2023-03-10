import React from 'react';
import styles from './styles.module.scss'

const categorise = ["Пицца","Комбо", "Закуски", "Десерты", "Напитки", "Другие товары"]

const Categories = () => {
	const [activeCategories, setActiveCategories ] = React.useState(0)
	const onClickCategories = (index) =>{
		setActiveCategories(index)
	}
	return (
		<div className={styles.categories}>
			<ul>
				{categorise.map((item, index) =>
						<li key={index} className={activeCategories === index ? styles.active : ''} onClick={() => onClickCategories(index)}>{item}</li>
					)}
			</ul>
		</div>
	);
};

export default Categories;