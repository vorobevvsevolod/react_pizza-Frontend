import React from 'react';
import styles from './pizzaBlock.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
	selectArrayFullProduct,
	selectShowFullProduct,
	setArrayFullProduct,
	setShowFullProduct
} from "../../../redux/slice/fullProductSlice";
import CounterPizzas from "../CounterPizzas";
import {AddProductInCartContext} from "../../../App";
import {selectCart} from "../../../redux/slice/cartSlice";

const PizzaBlock = (props) => {
	const showFullProduct = useSelector(selectShowFullProduct);
	const dispatch = useDispatch();
	const addInCart = React.useContext(AddProductInCartContext)
	const cart = useSelector(selectCart)
	
	const [idCart, setIdCart ] = React.useState()
	
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
	
	const clickButton = () => {
		if(props.productsTypeId === 1){
			clickFullProduct();
		} else {
			addInCart({
				price: props.price,
				img_url: props.img_url,
				name: props.name,
				dopProducts: [],
				composition: props.description,
				description: props.pizza_info.weight + `${props.productsTypeId === 4 ? ' л' : " г"}`,
				quantity: 1,
				dopPrice: 0,
				productId: props.id,
				typeProduct: props.productsTypeId
			})
		}
	}
	
	React.useEffect(() =>{
		if(cart.find(item => item.productId === props.id) !== undefined){
			setIdCart(cart.find(item => item.productId === props.id).id)
		}
		
	}, [cart])
	return (
		<div className={styles.wrapper} >
			<div className={styles.pizzaBlock}>
				<div className={styles.cu}>
					<div onClick={clickFullProduct}>
						<img
							className={styles.image}
							src={`${process.env.REACT_APP_API_SERVER}/${props.img_url}`}
							alt="Pizza"
						/>
						<h4 className={styles.title}>{props.name}</h4>
						<div className={styles.text}>{props.description}</div>
					</div>
				</div>
				
				<div className={styles.bottom}>
						<div className={styles.price}>{`${props.productsTypeId === 1 ? 'от' : ''}`} {props.price} ₽</div>
						<div>
							{
								(props.productsTypeId === 1)
									? <button className="button button--outline button--add" onClick={clickButton}>
									<span>{`${props.productsTypeId === 1 ? 'Выбрать' : "В корзину"}`}</span>
									</button>
									: (!!cart.find(item => item.productId === props.id))
										? <CounterPizzas id={idCart} big/>
										: <button className="button button--outline button--add" onClick={clickButton}>
											<span>{`${props.productsTypeId === 1 ? 'Выбрать' : "В корзину"}`}</span>
											</button>
							}
						</div>
					</div>
			</div>
			
		</div>
	);
};

export default PizzaBlock;