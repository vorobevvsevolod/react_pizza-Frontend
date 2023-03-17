import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (option, thunkAPI) =>{
	const state = thunkAPI.getState()
	const { data } = await axios.get(`/api/products?typeId=${state.products.activeType}&limit=${state.products.limit}&offset=${option.offset}${option.isCount ? '&isCount=true' : ''}`);
	return {products: data.message.products, count: (data.message.count) ? data.message.count : state.products.totalCount};
})


export const fetchProductsTypes = createAsyncThunk('productsTypes/fetchProductsTypes', async () =>{
	const { data } = await axios.get('/api/productstypes');
	
	return data.message;
})

const ProductsSlice = createSlice({
	name: 'products',
	initialState:{
		products: [],
		types: [],
		activeType: 1,
		totalCount: 0,
		currentPage: 1,
		limit: 8,
		status: '',
		error: ''
	},
	reducers:{
		setActiveType: (state, action) =>{
			state.activeType = action.payload
			state.currentPage = 1;
		},
		setCurrentPage: (state,action) =>{
			state.currentPage = action.payload;
		}

	},
	extraReducers: (builder) => {
		builder
			//////////////////Pizzas
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products = action.payload.products;
				state.totalCount = action.payload.count;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			
			//////////////////ProductsTypes
			.addCase(fetchProductsTypes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductsTypes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.types = action.payload;
			})
			.addCase(fetchProductsTypes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const ProductsReducer = ProductsSlice.reducer;
export const { setActiveType, setCurrentPage } = ProductsSlice.actions;