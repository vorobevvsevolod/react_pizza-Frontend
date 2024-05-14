import React from 'react';
import styles from './pizzaBlock.module.scss'
import { useSelector} from "react-redux";
import {
	selectShowFullProduct,
	setArrayFullProduct,
	setShowFullProduct
} from "../../../redux/slice/fullProductSlice";
import CounterPizzas from "../CounterPizzas";
import {AddProductInCartContext} from "../../../App";
import {selectCart} from "../../../redux/slice/cartSlice";
import {IProduct} from "../../../redux/interface/IProduct";
import {ICombos} from "../../../redux/interface/Combos/ICombos";
import {ICartItem} from "../../../redux/interface/ICartItem";
import {useAppDispatch} from "../../../redux";


const PizzaBlock: React.FC <IProduct> = (props) => {
    const addInCart = React.useContext(AddProductInCartContext)

    const [idCart, setIdCart ] = React.useState<number>(props.id | 0)
	const showFullProduct = useSelector(selectShowFullProduct);
    const cart = useSelector(selectCart)
	const dispatch = useAppDispatch();
    const [imageLoaded, setImageLoaded] = React.useState(false);



	React.useEffect(() =>{
		if(showFullProduct) document.documentElement.classList.add('no-scroll');
		 else document.documentElement.classList.remove('no-scroll');
	}, [showFullProduct])

	const clickFullProduct = () => {
        dispatch(setShowFullProduct())
	  dispatch(setArrayFullProduct(props))
    }

	
	const clickButton = () => {
		if(props.productsTypeId === 1){
			clickFullProduct();
		} else {
            if (addInCart) {
                addInCart({
                    price: props.price,
                    img_url: props.img_url,
                    name: props.name,
                    dopProducts: [],
                    composition: props.description,
                    description: `${props.pizza_info ? props.pizza_info.weight : ''}${props.productsTypeId === 4 ? ' л' : " г"}`,
                    quantity: 1,
                    productId: props.id,
                    typeProduct: props.productsTypeId
                } as ICartItem)
            }
		}
	}
	
	React.useEffect(() =>{
        const idCart = cart.find(item => item.productId === props.id)
		if(idCart && idCart.id) setIdCart(idCart.id)

	}, [cart])

	return (
		<div className={styles.wrapper} >
			<div className={styles.pizzaBlock}>
				<div className={styles.cu}>
					<div onClick={clickFullProduct}>
                        <img
                            className={styles.image}
                            src={imageLoaded ? `${process.env.REACT_APP_API_SERVER}/${props.img_url}` : '/img/pizzaLoad.svg'}
                            alt="Pizza"
                            onLoad={() => setImageLoaded(true)}
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