import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteProductCart, selectCart, updateQuantityProductInCart} from "../../../redux/slice/cartSlice";
import PizzaAxios from "../../../axios/Pizza-axios";
import {selectToken} from "../../../redux/slice/UserSlice";
import {useAppDispatch} from "../../../redux";
const CounterPizzas: React.FC<{ id: number, big?: boolean}> = ({ id , big}) => {
	const cart = useSelector(selectCart)
	const [ quantity, setQuantity ] = React.useState(1);
	const token = useSelector(selectToken)
	const dispatch = useAppDispatch();
	
	
	React.useEffect( () => {
		if(id) { // @ts-ignore
            setQuantity(cart.find(item => item.id === id) ? cart.find(item => item.id === id).quantity : 1)
        }
    }, [id])
	
	
	
	const plusQuantity = () => {
	  setQuantity(prev => prev + 1)
	}
	const minusQuantity = () => {
	  if(quantity === 1){
		  dispatch(deleteProductCart(id))
		  if(token) PizzaAxios.delete(id)
	  }
	  
	  if(quantity !== 0){
		  setQuantity(prev => prev - 1)
	  }
	}
	
	React.useEffect(() =>{
		if(quantity !== 1){
			dispatch(updateQuantityProductInCart({id: id, quantity: quantity}))
			if(token) PizzaAxios.update( id, quantity)
		}
	}, [quantity])
	return (
		
		<div className={`${styles.container} ${big ? styles.container_big : styles.container_standart}`}>
			<button className={`${styles.circle} ${big ? styles.circle_big : styles.circle_standart}`} onClick={minusQuantity}>
				<svg width="10" height="10" viewBox="0 0 10 10" className="icon">
					<rect fill="#7b7b7b" y="4" width="10" height="2" rx="1"></rect>
				</svg>
			</button>
			<div className={`${styles.count} ${big ? styles.count_big : styles.count_standart}`}>{quantity}</div>
			<button className={`${styles.circle} ${big ? styles.circle_big : styles.circle_standart}`} onClick={plusQuantity}>
				<svg width="10" height="10" viewBox="0 0 10 10" className="icon">
					<g fill="#7b7b7b">
						<rect x="4" width="2" height="10" ry="1"></rect>
						<rect y="4" width="10" height="2" rx="1"></rect>
					</g>
				</svg>
			</button>
		</div>
	);
};

export default CounterPizzas;