import React, {createContext} from "react";
import {useDispatch, useSelector} from "react-redux";

import './scss/app.scss'
import Header from "./componets/UI/Header";

import {fetchProductsTypes} from "./redux/slice/productSlice";
import {fetchDopProduct} from "./redux/slice/dopProductSlice";
import Cart from "./componets/UI/Cart";
import {clearTokenUser, fetchUserInfo, getTokenByCookie, setTokenUser} from "./redux/slice/UserSlice";
import {addProductInCart, fetchCart} from "./redux/slice/cartSlice";
import {fetchTypesAndSizes, setShowFullProduct} from "./redux/slice/fullProductSlice";
import Router from "./router";
import FullProduct from "./componets/UI/FullProduct";
import PizzaAxios from "./axios/Pizza-axios";
import {ICartItem} from "./redux/interface/ICartItem";
import {RootState, useAppDispatch} from "./redux";

export const AddProductInCartContext = React.createContext<null | ((obj: any) => void)>(null);

function App() {
	const dispatch = useAppDispatch();

	const { status, token } = useSelector((state: RootState) => state.userInfo)
	const addInCart = (obj: any): void => {
		let data;
		if(obj.typeProduct !== 1){
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
				} as ICartItem))
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
			} as ICartItem))
		}
		
		
	}

	React.useEffect(() =>{
		dispatch(getTokenByCookie())
		dispatch(setTokenUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5MjY5MjE3LCJleHAiOjE2NzkzNTU2MTd9.nbHAqsnneFwH7G_yiuLgZxRdPDDuy-0NJ63tR_J-Lfc"))
        dispatch(fetchUserInfo())
		dispatch(fetchProductsTypes())
		dispatch(fetchTypesAndSizes())

		dispatch(fetchDopProduct())
	}, [])
	
	React.useEffect(() =>{
        if(status === 'failed'){
            dispatch(clearTokenUser())
        } else{
            dispatch(fetchCart())
        }
	}, [status])
	
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
