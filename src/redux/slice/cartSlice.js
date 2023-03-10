import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCart = createAsyncThunk('cart/fetchCart', async () =>{
	const { data } = await axios.get('/api/basketpizza');
	return data.message;
})

const CartSlice = createSlice({
	name: 'cart',
	initialState:{
		cart: [],
		show: false,
		index: 0,
		status: '',
		error: ''
	},
	reducers:{
		setShowCart: state =>{
			state.show = !state.show;
		},
		addProductInCart: (state, action) =>{
			const { id } = action.payload;
			if(!id){
				state.cart = [...state.cart, {...action.payload, id: ++state.index}]
			}else{
				state.cart = [...state.cart, action.payload]
			}
			
		},
		deleteProductCart: (state, action) =>{
			state.cart = state.cart.filter(item => item.id !== action.payload)
		},
		deleteDopProductCart: (state, action) =>{
			const { id, dopProductId, price } = action.payload
			
			state.cart = state.cart.map(item => {
				if (item.id === id) {
					return {...item, price: item.price - price, dopProducts: item.dopProducts.filter(item => item !== dopProductId)}
				} else return item
			})
		},
		updateQuantityProductInCart: (state, action) =>{
			const { id, quantity } = action.payload;
			
			state.cart.map(item =>{
				if(item.id === id)
					return item.quantity = quantity;
			})
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cart = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const CartReducer = CartSlice.reducer;
export const selectCart = createSelector(
	(state) => state.cart.cart,
	(cart) => cart
);
export const {
	setShowCart,
	addProductInCart,
	deleteProductCart,
	updateQuantityProductInCart,
	deleteDopProductCart
} = CartSlice.actions