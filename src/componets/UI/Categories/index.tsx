import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, setActiveType} from "../../../redux/slice/productSlice";
import {RootState, useAppDispatch} from "../../../redux";


const Categories = () => {
	const { types , activeType } = useSelector((state: RootState) => state.products)
	const dispatch = useAppDispatch();

	React.useEffect(() =>{
		dispatch(fetchProducts({offset: 0, isCount: true}))
	}, [activeType])
	return (
		<div className={styles.categories}>
			<ul>
				{types.map((item) =>
						<li key={item.id} className={activeType === item.id ? styles.active : ''} onClick={() => dispatch(setActiveType(item.id))}>{item.name}</li>
					)}
			</ul>
		</div>
	);
};

export default Categories;