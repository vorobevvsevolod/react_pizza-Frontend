import { configureStore } from '@reduxjs/toolkit';
import { ProductsReducer } from "./slice/productSlice";
import { DopProductReducer } from "./slice/dopProductSlice";
import { CartReducer } from "./slice/cartSlice";
import { TokenUserReducer } from "./slice/UserSlice";
import { FullProductReducer } from "./slice/fullProductSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
	reducer:{
		userInfo: TokenUserReducer,
		products: ProductsReducer,
		dopProduct: DopProductReducer,
		cart: CartReducer,
		fullProduct: FullProductReducer
	}
})

export default store;


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch