import React from 'react';
import styles from './pizzaBlock.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
	selectArrayFullProduct,
	selectShowFullProduct,
	setArrayFullProduct,
	setShowFullProduct
} from "../../../redux/slice/fullProductSlice";

const PizzaBlock = (props) => {
	const showFullProduct = useSelector(selectShowFullProduct);
	const dispatch = useDispatch();
	React.useEffect(() =>{
		if(showFullProduct){
			document.documentElement.classList.add('no-scroll');
		} else {
			document.documentElement.classList.remove('no-scroll');
		}
	}, [showFullProduct])
	
	const clickFullProduct = () => {
	  dispatch(setArrayFullProduct(props))
		dispatch(setShowFullProduct())
	}
	return (
		<div className={styles.wrapper} >
			<div className={styles.pizzaBlock}>
				<div className={styles.cu} onClick={clickFullProduct}>
					<img
						className={styles.image}
						src={`${process.env.REACT_APP_API_SERVER}/${props.img_url}`}
						alt="Pizza"
					/>
					<h4 className={styles.title}>{props.name}</h4>
					<p className={styles.text}>{props.description}</p>
					<div className={styles.bottom}>
						<div className={styles.price}>от {props.price} ₽</div>
						<button className="button button--outline button--add">
							<span>Выбрать</span>
						</button>
					</div>
				</div>
				
				
				
			</div>
		</div>
	);
};

export default PizzaBlock;