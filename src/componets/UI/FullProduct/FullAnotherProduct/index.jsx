import React from 'react';
import styles from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
	selectArrayFullProduct,
	setShowFullProduct
} from "../../../../redux/slice/fullProductSlice";
import DopInfo from "../DopInfo/indes";
import OrangeButton from "../../Buttons/OrangeButton/OrangeButton";
const FullAnotherProduct = () => {
	const arrayFullProduct = useSelector(selectArrayFullProduct);
	const dispatch = useDispatch();
	
	const addInCart = () => {
	
	}
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<img className={styles.svg} src="/img/cross.svg" alt="" onClick={() => dispatch(setShowFullProduct())}/>
				
				<div className={styles.item_left}>
					<img
						width={320}
						src={`${process.env.REACT_APP_API_SERVER}${arrayFullProduct.img_url}`}
						alt=""/>
				</div>
				<div className={styles.item_right}>
					<div className={styles.item_right_content}>
						<div className={styles.item_right_title}>
							<h2>{arrayFullProduct.name}</h2>
							<DopInfo infoArray={arrayFullProduct.pizza_info} typeProduct={arrayFullProduct.productsTypeId} top='14%' right='-5%'/>
						</div>
						<p className={styles.weight}>{arrayFullProduct.pizza_info?.weight} {arrayFullProduct.productsTypeId === 4 ? 'л' : "г"}</p>
						<p className={styles.text}>{arrayFullProduct.description}{`${arrayFullProduct.description ? '.' : ''}`}</p>
					</div>
					<OrangeButton onClick={addInCart} title={`Добавить в корзину за ${arrayFullProduct.price} ₽`}/>
				</div>
			</div>
		</div>
	);
};

export default FullAnotherProduct;