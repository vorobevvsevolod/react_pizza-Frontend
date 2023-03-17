import React, {createContext} from "react";
import {useDispatch, useSelector} from "react-redux";

import './scss/app.scss'
import Header from "./componets/UI/Header";

import {fetchProductsTypes} from "./redux/slice/producrSlice";
import {fetchDopProduct} from "./redux/slice/dopProductSlice";
import Cart from "./componets/UI/Cart";
import {clearTokenUser, fetchUserInfo, getTokenByCookie, selectToken, setTokenUser} from "./redux/slice/UserSlice";
import {addProductInCart, fetchCart} from "./redux/slice/cartSlice";
import {fetchTypesAndSizes, setShowFullProduct} from "./redux/slice/fullProductSlice";
import Router from "./router";
import FullProduct from "./componets/UI/FullProduct";
import PizzaAxios from "./axios/Pizza-axios";

export const AddProductInCartContext = createContext(null);


function App() {
	const dispatch = useDispatch();
	const { status, token } = useSelector(state => state.userInfo)
	const addInCart = (obj) => {
		let data = {} ;
		if(obj.typeProduct != 1){
			data = {
				productId: obj.productId,
				description: obj.description
			}
		}else{
			data = {
				pizzasSizedId: obj.pizzasSizedId,
				description: obj.description,
				dopProducts: obj.dopProducts
			}
			dispatch(setShowFullProduct())
		}
		if(token){
			PizzaAxios.add(data).then(res =>{
				dispatch(addProductInCart({
					id: res,
					price: obj.price,
					img_url: obj.img_url,
					name: obj.name,
					dopProducts: obj.dopProducts,
					composition: obj.composition,
					description:obj. description,
					quantity: 1,
					dopPrice: obj.dopPrice,
					productId: obj.productId,
				}))
			})
		}else{
			dispatch(addProductInCart({
				price: obj.price,
				img_url: obj.img_url,
				name: obj.name,
				dopProducts: obj.dopProducts,
				composition: obj.composition,
				description:obj. description,
				quantity: 1,
				dopPrice: obj.dopPrice,
				productId: obj.productId,
			}))
		}
		
		
	}
	
	React.useEffect(() =>{
		dispatch(getTokenByCookie())
		//dispatch(setTokenUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5MDAzNzk0LCJleHAiOjE2NzkwOTAxOTR9.e0-QKF4docgN4vMfXky1a5OS9L2H-7nR_Bh2YSc0ziE"))
		
		dispatch(fetchProductsTypes())
		dispatch(fetchTypesAndSizes())
		dispatch(fetchDopProduct())
	}, [])
	
	React.useEffect(() =>{
		if(token){
			dispatch(fetchUserInfo()).then(res =>{
				if(status === 'failed'){
					dispatch(clearTokenUser())
				} else{
					dispatch(fetchCart())
				}
			})
		}
	}, [token])
	
	return (
		<AddProductInCartContext.Provider value={addInCart}>
			<div className="wrapper">
				<Header/>
				<Cart/>
				<FullProduct/>
				<div className="container">
					<Router/>
				</div>
			</div>
		</AddProductInCartContext.Provider>
		
	);
}

export default App;
