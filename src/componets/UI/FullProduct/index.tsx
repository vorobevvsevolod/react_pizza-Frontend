import React from 'react';


import { useSelector} from "react-redux";
import FullPizza from "./FullPizza";
import FullAnotherProduct from "./FullAnotherProduct";
import {selectArrayFullProduct, selectShowFullProduct} from "../../../redux/slice/fullProductSlice";
import styles from "./fullProduct.module.scss";
import {RootState} from "../../../redux";

const FullProduct = () => {
	const activeTypeState = useSelector((state: RootState) => state.products.activeType)
	const showFullProduct = useSelector(selectShowFullProduct);
	const arrayFullProduct = useSelector(selectArrayFullProduct);

	return (
		<div className={showFullProduct ? styles.overlay : styles.overlay_hidden}>
			
			{
				(arrayFullProduct.id)
					? (showFullProduct && activeTypeState !== 1) ? <FullAnotherProduct/> : <FullPizza/>
					: <></>
			}
		</div>
	);
};

export default FullProduct;