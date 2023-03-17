import React from 'react';
import DopProduct from "./DopProduct";
import styles from './collectionDopProducts.module.scss'
import {useSelector} from "react-redux";
import {selectCartDopProducts} from "../../../redux/slice/fullProductSlice";
const CollectionDopProducts = (props) => {
	const [dopProducts, setDopProducts] = React.useState([]);
	const dopProductsSlice = useSelector(state => state.dopProduct.dopProducts)

	React.useEffect(() => {
		const filteredArray = dopProductsSlice.filter(dopProduct =>
			props.array.some(item => item === dopProduct.id)
		);
		
		const newArray = filteredArray.map(item => {
				return ({...item, price: item.price + props.dopPrice})
		})
		setDopProducts(newArray);
	}, [])
	
	React.useEffect(() =>{
	
	}, [dopProducts])
	return (
		<>
			<div className={styles.title}>Добавить по вкусу</div>
			<div className={styles.container}>
				{
					dopProducts.map(item =>
						<DopProduct key={item.id} {...item}/>
					)
				}
			</div>
		</>
		
	);
};

export default CollectionDopProducts;