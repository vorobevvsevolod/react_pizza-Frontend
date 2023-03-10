import React from 'react';
import Categories from "../../UI/Categories";
import SortSelector from "../../UI/SortSelect";
import PizzaBlock from "../../UI/PizzaBlock";
import {useSelector} from "react-redux";
import PizzaLoad from "../../UI/PizzaLoad";

const Home = () => {
	const {products, status, error } = useSelector(state => state.products)
	return (
		<>
			<Categories/>
			<div className="content__top"><h1 className="content__title">Пиццы</h1><SortSelector/></div>
			
			<div className="content__items">
				{
					(products.length)
						? products.map(item => <PizzaBlock key={item.id} {...item}/>)
						: [...new Array(8)].map((_, i) => <PizzaLoad key={i}/>)
				}
			</div>
		</>
	);
};

export default Home;