import React from "react";
import {useDispatch, useSelector} from "react-redux";

import './scss/app.scss'
import Header from "./componets/UI/Header";

import {fetchProducts} from "./redux/slice/producrSlice";
import {fetchSizes} from "./redux/slice/sizesSlice";
import {fetchTypes} from "./redux/slice/typesSlice";
import {fetchDopProduct} from "./redux/slice/dopProductSlice";
import Home from "./componets/Pages/Home";
import Cart from "./componets/UI/Cart";
import {getTokenByCookie, setTokenUser} from "./redux/slice/TokenUserSlice";
import {fetchCart} from "./redux/slice/cartSlice";
import FullPizza from "./componets/UI/FullPizza";
import {selectShowFullProduct} from "./redux/slice/fullProductSlice";
//
function App() {
	
	const dispatch = useDispatch();
	const showFullProduct = useSelector(selectShowFullProduct);
	
	React.useEffect(() =>{
			dispatch(getTokenByCookie())
			dispatch(fetchProducts())
			dispatch(fetchSizes())
			dispatch(fetchTypes())
			dispatch(fetchDopProduct())
			dispatch(fetchCart())
	}, [])
	
	return (
		<div className="wrapper">
			<Header/>
			<Cart/>
			{(showFullProduct) && <FullPizza/>}
			<div className="container">
				<Home/>
			</div>
		</div>
	);
}

export default App;
