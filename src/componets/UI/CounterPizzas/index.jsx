import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteProductCart, updateQuantityProductInCart} from "../../../redux/slice/cartSlice";
import PizzaAxios from "../../../axios/Pizza-axios";
import {selectToken} from "../../../redux/slice/UserSlice";
const CounterPizzas = (props) => {
	const { cart } = useSelector(state => state.cart)
	const [ quantity, setQuantity ] = React.useState(1);
	const token = useSelector(selectToken)
	const dispatch = useDispatch();
	
	
	React.useEffect( () => {
		if(props.id){
			console.log(props.id)
			setQuantity(cart.find(item => item.id === props.id) ? cart.find(item => item.id === props.id).quantity : 1)
		}
		
	}, [props])
	
	
	
	const plusQuantity = () => {
	  setQuantity(prev => prev + 1)
	}
	const minusQuantity = () => {
	  if(quantity === 1){
		  dispatch(deleteProductCart(props.id))
		  if(token) PizzaAxios.delete(props.id)
	  }
	  
	  if(quantity !== 0){
		  setQuantity(prev => prev - 1)
	  }
	}
	
	React.useEffect(() =>{
		if(quantity !== 1){
			dispatch(updateQuantityProductInCart({id: props.id, quantity: quantity}))
			if(token) PizzaAxios.update( props.id, quantity)
		}
	}, [quantity])
	return (
		
		<div className={`${styles.container} ${props.big ? styles.container_big : styles.container_standart}`}>
			<button className={`${styles.circle} ${props.big ? styles.circle_big : styles.circle_standart}`} onClick={minusQuantity}>
				<svg width="10" height="10" viewBox="0 0 10 10" className="icon">
					<rect fill="#7b7b7b" y="4" width="10" height="2" rx="1"></rect>
				</svg>
			</button>
			<div className={`${styles.count} ${props.big ? styles.count_big : styles.count_standart}`}>{quantity}</div>
			<button className={`${styles.circle} ${props.big ? styles.circle_big : styles.circle_standart}`} onClick={plusQuantity}>
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