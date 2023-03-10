import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteProductCart, updateQuantityProductInCart} from "../../../redux/slice/cartSlice";
import PizzaAxios from "../../../axios/Pizza-axios";
const CounterPizzas = (props) => {
	const { cart } = useSelector(state => state.cart)
	const [ quantity, setQuantity ] = React.useState(1);
	const dispatch = useDispatch();
	React.useEffect( () => {
		setQuantity(cart.find(item => item.id === props.id).quantity)
	}, [props])
	
	const plusQuantity = () => {
	  setQuantity(prev => prev + 1)
	}
	const minusQuantity = () => {
	  if(quantity === 1){
		  dispatch(deleteProductCart(props.id))
		  PizzaAxios.delete(props.id)
	  }
	  
	  if(quantity !== 0){
		  setQuantity(prev => prev - 1)
	  }
	}
	
	React.useEffect(() =>{
		if(quantity !== 1){
			dispatch(updateQuantityProductInCart({id: props.id, quantity: quantity}))
			PizzaAxios.update( props.id, quantity)
		}
	}, [quantity])
	return (
		<div className={styles.container}>
			<button className={styles.circle} onClick={minusQuantity}>
				<svg width="10" height="10" viewBox="0 0 10 10" className="icon">
					<rect fill="#7b7b7b" y="4" width="10" height="2" rx="1"></rect>
				</svg>
			</button>
			<div className={styles.count}>{quantity}</div>
			<button className={styles.circle} onClick={plusQuantity}>
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