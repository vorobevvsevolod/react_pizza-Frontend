import React from 'react';
import styles from './styles.module.scss'
import PizzaAxios from "../../../axios/Pizza-axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteDopProductCart} from "../../../redux/slice/cartSlice";
import {selectToken} from "../../../redux/slice/UserSlice";
import {useAppDispatch} from "../../../redux";
import {IDopProduct} from "../../../redux/interface/IDopProduct";

const PizzaDopProductList: React.FC<{ dopProducts: IDopProduct[], id: number, order?:boolean}> = ({ dopProducts, id, order}) => {
	const [showPopup, setShowPopup] = React.useState(false);
	const token = useSelector(selectToken)
	const dispatch = useAppDispatch();
	const deleteDopProduct = (dopProductId: number, price: number): void => {
		
		dispatch(deleteDopProductCart({id: id, dopProductId: dopProductId, price: price}))
		
		if(token){
			PizzaAxios.deleteDopProduct(id, dopProductId)
		}
		setShowPopup(false)
	}
    return (
		<div className={styles.container}>
			<button className={styles.buttonList} onClick={() => setShowPopup(!showPopup)}>
				<span className={styles.text}>Дополнительные продукты</span>
				<img className={`${styles.image} ${(showPopup) ? styles.image_open : ''}`} width={20}  src="/img/arrowProducstLits.svg" alt=""/>
			</button>
			{
				showPopup
				? <ul className={`${styles.popup} ${order ? styles.popup_order : styles.popup_cart}`}>
						{dopProducts.map(item =>
								<li key={item.id}>
									<p>{item.name}</p>
									<div>
										<span className={styles.price}>{item.price} ₽</span>
										<img width={10} className={styles.delete} src="/img/delete.svg" alt="" onClick={() => deleteDopProduct(item.id, item.price)}/>
									</div>
								</li>
							)}
					</ul>
				: ''
			}
			
		</div>
	);
}


export default PizzaDopProductList;
