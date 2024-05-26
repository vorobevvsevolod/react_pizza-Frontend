import React from 'react';
import DopProduct from "./DopProduct/DopProductUI";
import styles from './collectionDopProducts.module.scss'
import {useSelector} from "react-redux";
import {selectDopProducts} from "../../../redux/slice/dopProductSlice";
import {IDopProduct} from "../../../redux/interface/IDopProduct";

interface CollectionDopProducts{
    array: number[];
    dopPrice: number
}
const CollectionDopProducts: React.FC<CollectionDopProducts> = ({ array, dopPrice }) => {
	const dopProductsSlice = useSelector(selectDopProducts)
	
	const [dopProducts, setDopProducts] = React.useState<IDopProduct[]>([]);

	React.useEffect(() => {
		const filteredArray = dopProductsSlice.filter(dopProduct =>
			array.some(item => item === dopProduct.id)
		);
		
		const newArray = filteredArray.map(item => {
			return ({...item, price: item.price + dopPrice})
		})
		setDopProducts(newArray);
    }, [dopPrice])

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