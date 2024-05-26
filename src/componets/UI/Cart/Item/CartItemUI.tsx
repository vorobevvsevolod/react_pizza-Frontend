import React, {useContext} from 'react';
import styles from './item.module.scss'
import CounterPizzas from "../../CounterPizzas/CounterPizzaUI";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductCart} from "../../../../redux/slice/cartSlice";
import PizzaAxios from "../../../../axios/Pizza-axios";
import PizzaDopProductList from "../../ProductList/ProductListUI";
import {selectToken} from "../../../../redux/slice/UserSlice";
import {ICartItem} from "../../../../redux/interface/ICartItem";
import {selectDopProducts} from "../../../../redux/slice/dopProductSlice";
import {IDopProduct} from "../../../../redux/interface/IDopProduct";
import {ShowErrorModalContext} from "../../../../App";

type ItemProps = ICartItem & {
    order?: boolean;
};

const Item:React.FC<ItemProps> = ({id, composition, description, dopPrice, dopProducts, img_url, name, price, productId, quantity, order}) => {
	const dispatch = useDispatch();
	const dopProductsSlice = useSelector(selectDopProducts)
	const [dopProductsState, setDopProductsState] = React.useState<IDopProduct[]>([]);
	const token = useSelector(selectToken)
    const { errorHandler } = useContext(ShowErrorModalContext);
	const deleteProduct = () => {
        if(id) {
            if (token) {
                PizzaAxios.delete(id).then(res => {
                    if (res.status === 200) {
                        dispatch(deleteProductCart(id));
                    } else errorHandler({data: res, errorText: 'Ошибка удаление продукта из корзины'});

                });
            } else dispatch(deleteProductCart(id));
        }
	}
	
	React.useEffect(() =>{
		if(dopProducts && dopPrice){
			const filteredArray = dopProductsSlice.filter(dopProduct =>
				dopProducts.some(item => item === dopProduct.id)
			).map(item => ({...item, price: item.price + dopPrice}))

            setDopProductsState(filteredArray)
        }
		
	}, [dopProducts])
    if(order)
        return (
            <div className={`${styles.item} ${ styles.item_order}`}>

            <img height={150} src={`${process.env.REACT_APP_API_SERVER}/${img_url}`} alt=""/>

            <div className={styles.item_container}>
                    <svg width={25}
                         height={25}
                         className={`${styles.item_close} ${styles.item_close_order}`}
                         fill="none"
                         viewBox="0 0 24 24"
                         onClick={deleteProduct}
                    >
                        <path d="M17.3 5.3a1 1 0 111.4 1.4L13.42 12l5.3 5.3a1 1 0 11-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 01-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 016.7 5.3l5.3 5.28 5.3-5.3z" fill="#000"></path>
                    </svg>
                    <div className={styles.item_info}>

                        <div className={`${styles.item_info_description} ${order ? styles.item_info_description_composition_order : styles.item_info_description_composition_cart}`}>
                            <span>{name}</span>
                            <p className={styles.item_info_description_text}>{description}</p>
                            <p className={styles.item_info_description_composition}>{composition}</p>
                            {(dopProducts && dopProducts.length && id) ? <PizzaDopProductList order dopProducts={dopProductsState} id={id}/> : ''}
                        </div>
                    </div>
                    <div className={styles.item_price}>
                        <span>{price * quantity} ₽</span>
                        {(id) && <CounterPizzas id={id}/>}
                    </div>
                </div>

        </div>
        )

	return (
		<div className={`${styles.item} ${order ? styles.item_order : ''}`}>
			<svg width={20}
			     height={20}
			     className={`${styles.item_close} ${styles.item_close_cart}`}
			     fill="none"
			     viewBox="0 0 24 24"
			     onClick={deleteProduct}
			>
				<path d="M17.3 5.3a1 1 0 111.4 1.4L13.42 12l5.3 5.3a1 1 0 11-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 01-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 016.7 5.3l5.3 5.28 5.3-5.3z" fill="#000"></path>
			</svg>
			<div className={styles.item_info}>
				<img width={75} height={75} src={`${process.env.REACT_APP_API_SERVER}/${img_url}`} alt=""/>
				<div className={`${styles.item_info_description} ${order ? styles.item_info_description_composition_order : styles.item_info_description_composition_cart}`}>
					<span>{name}</span>
					<p className={styles.item_info_description_text}>{description}</p>
					<p className={styles.item_info_description_composition}>{composition}</p>
					{(dopProducts && dopProducts.length && id) ? <PizzaDopProductList dopProducts={dopProductsState} id={id}/> : ''}
				</div>
			</div>
			<div className={styles.item_price}>
				<span>{price * quantity} ₽</span>
                {(id) && <CounterPizzas id={id}/>}
			</div>
		</div>
	);
};

export default Item;