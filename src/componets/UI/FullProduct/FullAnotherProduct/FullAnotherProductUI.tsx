import React from 'react';
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";
import {
    selectArrayFullProduct, selectShowFullProduct,
    setShowFullProduct
} from "../../../../redux/slice/fullProductSlice";
import DopInfo from "../DopInfo/DopInfoUI";
import OrangeButtonUI from "../../Buttons/OrangeButton/OrangeButtonUI";
import {useAppDispatch} from "../../../../redux/redux";
import {ICartItem} from "../../../../redux/interface/ICartItem";
import {AddProductInCartContext} from "../../../../App";
const FullAnotherProduct = () => {
    const addInCart = React.useContext(AddProductInCartContext)
	const arrayFullProduct = useSelector(selectArrayFullProduct);
	const dispatch = useAppDispatch();
	
	const onClick = () => {
        dispatch(setShowFullProduct())
        if (addInCart) {
            addInCart({
                ...arrayFullProduct,
                productId: arrayFullProduct.id,
                dopProducts: [],
                composition: arrayFullProduct.description,
                description: `${arrayFullProduct.pizza_info ?  arrayFullProduct.pizza_info.weight : ''}${arrayFullProduct.productsTypeId === 4 ? ' л' : " г"}`,
                quantity: 1,
            } as ICartItem)
        }

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
                                {(arrayFullProduct.pizza_info) && <DopInfo infoArray={arrayFullProduct.pizza_info}
	                                                                       typeProduct={arrayFullProduct.productsTypeId}/>}
						</div>
						<p className={styles.weight}>{arrayFullProduct.pizza_info?.weight} {arrayFullProduct.productsTypeId === 4 ? 'л' : "г"}</p>
						<p className={styles.text}>{arrayFullProduct.description}{`${arrayFullProduct.description ? '.' : ''}`}</p>
					</div>
                    <div className={styles.item_right_add}>
                        <OrangeButtonUI onClick={onClick} title={`Добавить в корзину за ${arrayFullProduct.price} ₽`}/>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default FullAnotherProduct;