import { configureStore } from '@reduxjs/toolkit';
import { ProductsReducer } from "./slice/producrSlice";
import { DopProductReducer } from "./slice/dopProductSlice";
import { CartReducer } from "./slice/cartSlice";
import { TokenUserReducer } from "./slice/UserSlice";
import { FullProductReducer } from "./slice/fullProductSlice";

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