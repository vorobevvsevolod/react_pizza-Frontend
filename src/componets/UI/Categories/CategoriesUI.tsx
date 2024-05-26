import React from 'react';
import styles from './styles.module.scss'
import { useSelector} from "react-redux";
import { setActiveType} from "../../../redux/slice/productSlice";
import {RootState, useAppDispatch} from "../../../redux/redux";



const Categories = () => {
	const { types , activeType } = useSelector((state: RootState) => state.products)
	const dispatch = useAppDispatch();

	return (
        <div className={styles.categories_container}>
            <div className={styles.categories}>
                <ul>
                    {types && types.length && types.map((item) =>
                        <li key={item.id} className={activeType === item.id ? styles.active : ''} onClick={() => dispatch(setActiveType(item.id))}>{item.name}</li>
                    )}
                </ul>
            </div>
        </div>

	);
};

export default Categories;