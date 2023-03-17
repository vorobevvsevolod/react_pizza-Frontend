import React from 'react';
import styles from './styles.module.scss'
import PizzaAxios from "../../../axios/Pizza-axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteDopProductCart} from "../../../redux/slice/cartSlice";
import {selectToken} from "../../../redux/slice/UserSlice";
function PizzaDopProductList(props) {
	const [showPopup, setShowPopup] = React.useState(false);
	const token = useSelector(selectToken)
	const dispatch = useDispatch();
	const deleteDopProduct = (dopProductId, price) => {
		
		dispatch(deleteDopProductCart({id: props.id, dopProductId: dopProductId, price: price}))
		
		if(token){
			PizzaAxios.deleteDopProduct(props.id, dopProductId)
		}
		setShowPopup(false)
	}
	return (
		<>
			<button className={styles.buttonList} onClick={() => setShowPopup(!showPopup)}>
				<span className={styles.text}>Дополнительные продукты</span>
				<img className={`${styles.image} ${(showPopup) ? styles.image_open : ''}`} width={20}  src="/img/arrowProducstLits.svg" alt=""/>
			</button>
			{
				showPopup
				? <ul className={styles.popup}>
						{props.products.map(item =>
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
			
		</>
	);
}


export default PizzaDopProductList;
