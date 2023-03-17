import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, setActiveType} from "../../../redux/slice/producrSlice";


const Categories = () => {
	const { types , activeType, limit } = useSelector(state => state.products)
	const dispatch = useDispatch()

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