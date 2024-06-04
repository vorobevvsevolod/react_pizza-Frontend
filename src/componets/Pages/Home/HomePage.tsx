import React from 'react';
import Categories from "../../UI/Categories/CategoriesUI";
import PizzaBlock from "../../UI/PizzaBlock/PizzaBlockUI";
import { useSelector} from "react-redux";
import PizzaLoad from "../../UI/PizzaLoad/PizzaLoadUI";
import Pagination from "../../UI/Pagination/PaginationUI";
import {RootState, useAppDispatch} from "../../../redux/redux";
import styles from './styles.module.scss'
import InputDostavka from "../../UI/InputDostavka/InputDostavka";
import {setCurrentPage, setSearchValue} from "../../../redux/slice/productSlice";
import ComboBlock from "../../UI/Combos/ComboBlock/ComboBlockUI";
import DOMPurify from 'dompurify';

const Home = () => {
	const {products, status, error, types, activeType, search, combos, currentPage} = useSelector((state: RootState) => state.products)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, activeType]);
	return (
		<>
            <div className={styles.containerVisible}>
                <Categories/>
            </div>
			<div className={styles.content__top}>
                <h1 className={styles.content__title}>{types && types.length ? types[activeType - 1]?.name : ''}</h1>
                <div className={styles.content__top__search_container}>
                    {
                        activeType !== 5
                            ? <InputDostavka value={search} setValue={(value: string) => {
                                    setTimeout(() => {
                                        if (/^[а-яА-ЯёЁ0-9\s-]+$/.test(value)|| value === "") {
                                            value = DOMPurify.sanitize(value);
                                            dispatch(setSearchValue(value));
                                            dispatch(setCurrentPage(1));
                                        }
                                    }, 50);
                                }
                                }
                                     placeholder={'Поиск...'}
                                /> : <></>
                    }
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