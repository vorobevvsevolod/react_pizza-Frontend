import React, {Suspense} from 'react';
import Categories from "../../UI/Categories";
import PizzaBlock from "../../UI/PizzaBlock";
import { useSelector} from "react-redux";
import PizzaLoad from "../../UI/PizzaLoad";
import {fetchProducts} from "../../../redux/slice/productSlice";
import Pagination from "../../UI/Pagination";
import {RootState, useAppDispatch} from "../../../redux";

const Home = () => {
	const {products, status, error, types, activeType} = useSelector((state: RootState) => state.products)

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
			
			<Pagination/>
		</>
	);
};

export default Home;