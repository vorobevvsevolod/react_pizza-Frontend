import React from 'react';
import Categories from "../../UI/Categories";
import PizzaBlock from "../../UI/PizzaBlock";
import {useDispatch, useSelector} from "react-redux";
import PizzaLoad from "../../UI/PizzaLoad";
import {fetchProducts} from "../../../redux/slice/producrSlice";
import Pagination from "../../UI/Pagination";

const Home = () => {
	const {products, status, error, types, activeType, currentPage, limit } = useSelector(state => state.products)
	const dispatch = useDispatch()
	
	
	
	const onClickButtonPagination = () => {
		const offset = (currentPage - 1) * limit;
		dispatch(fetchProducts({limit: limit, offset: offset}))
	}
	return (
		<>
			<Categories/>
			<div className="content__top"><h1 className="content__title">{types[activeType - 1]?.name}</h1></div>
			
			<div className="content__items">
				{
					(status !== 'loading')
						? products.map(item => <PizzaBlock key={item.id} {...item}/>)
						: [...new Array(8)].map((_, i) => <PizzaLoad key={i}/>)
				}
			</div>
			
			<Pagination onClick={onClickButtonPagination}/>
		</>
	);
};

export default Home;