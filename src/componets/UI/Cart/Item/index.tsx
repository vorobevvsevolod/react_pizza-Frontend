import React from 'react';
import styles from './item.module.scss'
import CounterPizzas from "../../CounterPizzas";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductCart} from "../../../../redux/slice/cartSlice";
import PizzaAxios from "../../../../axios/Pizza-axios";
import PizzaDopProductList from "../../ProductList";
import {selectToken} from "../../../../redux/slice/UserSlice";
import {ICartItem} from "../../../../redux/interface/ICartItem";
import {selectDopProducts} from "../../../../redux/slice/dopProductSlice";
import {IDopProduct} from "../../../../redux/interface/IDopProduct";

const Item:React.FC<ICartItem> = ({id, composition, description, dopPrice, dopProducts, img_url, name, price, productId, quantity}) => {
	const dispatch = useDispatch();
	const dopProductsSlice = useSelector(selectDopProducts)
	const [dopProductsState, setDopProductsState] = React.useState<IDopProduct[]>([]);
	const token = useSelector(selectToken)
	const deleteProduct = () => {
		dispatch(deleteProductCart(id))
		if(token){
			PizzaAxios.delete(id)
		}
	}
	
	React.useEffect(() =>{
		if(dopProducts){
			const filteredArray = dopProductsSlice.filter(dopProduct =>
				dopProducts.some(item => item === dopProduct.id)
			).map(item => ({...item, price: item.price + dopPrice}))

            setDopProductsState(filteredArray)
            console.log(filteredArray);
        }
		
	}, [dopProducts])

	return (
		<div className={styles.item}>
			<svg width={20}
			     height={20}
			     className={styles.item_close}
			     fill="none"
			     viewBox="0 0 24 24"
			     onClick={deleteProduct}
			>
				<path d="M17.3 5.3a1 1 0 111.4 1.4L13.42 12l5.3 5.3a1 1 0 11-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 01-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 016.7 5.3l5.3 5.28 5.3-5.3z" fill="#000"></path>
			</svg>
			<div className={styles.item_info}>
				<img width={75} height={75} src={`${process.env.REACT_APP_API_SERVER}/${img_url}`} alt=""/>
				<div className={styles.item_info_description}>
					<span>{name}</span>
					<p className={styles.item_info_description_text}>{description}</p>
					<p className={styles.item_info_description_composition}>{composition}</p>
					{(dopProducts) && (dopProducts.length) ? <PizzaDopProductList dopProducts={dopProductsState} id={id}/> : ''}
				</div>
			</div>
			<div className={styles.item_price}>
				<span>{price * quantity} ₽</span>
				<CounterPizzas id={id}/>
			</div>
		</div>
	);
};

export default Item;