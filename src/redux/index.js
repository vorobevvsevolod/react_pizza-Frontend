import { configureStore } from '@reduxjs/toolkit';
import { ProductsReducer } from "./slice/producrSlice";
import { SizesReducer } from "./slice/sizesSlice";
import { TypesReducer } from "./slice/typesSlice";
import { DopProductReducer } from "./slice/dopProductSlice";
import { CartReducer } from "./slice/cartSlice";
import { TokenUserReducer } from "./slice/TokenUserSlice";
import { FullProductReducer } from "./slice/fullProductSlice";

const store = configureStore({
	reducer:{
		tokenUser: TokenUserReducer,
		products: ProductsReducer,
		sizes: SizesReducer,
		types: TypesReducer,
		dopProduct: DopProductReducer,
		cart: CartReducer,
		fullProduct: FullProductReducer
	}
})

export default store;