import React from 'react';


import { useSelector} from "react-redux";
import FullPizza from "./FullPizza/FullPIzzaUI";
import FullAnotherProduct from "./FullAnotherProduct/FullAnotherProductUI";
import {selectArrayFullProduct, selectShowFullProduct} from "../../../redux/slice/fullProductSlice";
import styles from "./fullProduct.module.scss";
import {RootState} from "../../../redux/redux";
import ComboModal from "../Combos/ComboModal/ComboModalUI";

const FullProduct = () => {
	const {activeType, activeCombo} = useSelector((state: RootState) => state.products)
	const showFullProduct = useSelector(selectShowFullProduct);
	const arrayFullProduct = useSelector(selectArrayFullProduct);



	return (
		<div className={showFullProduct ? styles.overlay : styles.overlay_hidden}>
			
			{
                activeCombo ?
                    (
                        showFullProduct  ? <ComboModal/> : <></>
                    )
                : (
                    arrayFullProduct.id
					? (showFullProduct && activeType !== 1) ? <FullAnotherProduct/> : <FullPizza/>
					: <></>
                )
			}
		</div>
	);
};

export default FullProduct;