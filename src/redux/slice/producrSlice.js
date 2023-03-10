import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
	const { data } = await axios.get('/api/pizza');
	const newProduct = data.message.map(pizza => ({...pizza, cartDopProduct: []}))
	
	return newProduct;
})

const ProductsSlice = createSlice({
	name: 'products',
	initialState:{
		products: [],
		status: '',
		error: ''
	},
	reducers:{
		
		addDopProduct: (state, action) =>{
			state.products.map(item =>{
				if(item.id === action.payload.pizzaId)
					return item.cartDopProduct = ([...item.cartDopProduct, action.payload.dopProduct]);
			})
		},
		updatePriceDopProduct: (state, action) =>{
			state.products.map(item =>{
				if(item.id === action.payload.pizzaId)
					item.cartDopProduct.map(dop => {
						if(dop.id === action.payload.id)
							return dop.price = action.payload.price
					})
			})
		},
		deleteDopProduct: (state, action) =>{
			state.products.map(item =>{
				if(item.id === action.payload.pizzaId)
					return item.cartDopProduct = item.cartDopProduct.filter(item => item.id !== action.payload.id);
			})
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const ProductsReducer = ProductsSlice.reducer;
export const {
	addDopProduct,
	updatePriceDopProduct,
	deleteDopProduct
} = ProductsSlice.actions