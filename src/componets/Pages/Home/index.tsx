import React from 'react';
import Categories from "../../UI/Categories";
import PizzaBlock from "../../UI/PizzaBlock";
import { useSelector} from "react-redux";
import PizzaLoad from "../../UI/PizzaLoad";
import Pagination from "../../UI/Pagination";
import {RootState, useAppDispatch} from "../../../redux";
import styles from './styles.module.scss'
import InputDostavka from "../../UI/InputDostavka";
import {setCurrentPage, setSearchValue} from "../../../redux/slice/productSlice";
import ComboBlock from "../../UI/Combos/ComboBlock";

const Home = () => {
	const {products, status, error, types, activeType, search, combos} = useSelector((state: RootState) => state.products)
    const dispatch = useAppDispatch();

	return (
		<>
			<Categories/>
			<div className={styles.content__top}>
                <h1 className={styles.content__title}>{types[activeType - 1]?.name}</h1>
                <div className={styles.content__top__search_container}>
                    <InputDostavka value={search} setValue={(value: string) => {
                            setTimeout(() => {
                                dispatch(setSearchValue(value))
                                dispatch(setCurrentPage(1))
                            }, 50)
                        }
                    }
                         placeholder={'Поиск...'}
                    />
                    {search && <img src="/img/cross.svg" alt="" onClick={() => dispatch(setSearchValue(""))}/>}
                </div>
            </div>

            <div className={styles.content__items}>
				{
					(status !== 'loading')
						? (
                            activeType === 5
                                ? combos.map(item => <ComboBlock key={item.id} {...item}/>)
                                : products.map(item => <PizzaBlock key={item.id} {...item}/>)
                        )
						: [...new Array(8)].map((_, i) => <PizzaLoad key={i}/>)
				}
			</div>
			
			<Pagination/>
		</>
	);
};

export default Home;