import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTypesAndSizes = createAsyncThunk('typesSizes/fetchTypesAndSizes', async () =>{
	const dataTypes = await axios.get('/api/types');
	const dataSizes = await axios.get('/api/sizes');
	return {types: dataTypes.data.message, sizes: dataSizes.data.message}
})
const FullProductSlice = createSlice({
	name: 'fullProduct',
	initialState:{
		show: false,
		array: {},
		types: [],
		sizes: [],
		cartDopProducts: [],
		status: '',
		error: ''
	},
	reducers:{
		setShowFullProduct: (state) => {
			state.show = !state.show;
			if(!state.show) state.array = {};
		},
		
		setArrayFullProduct: (state, action) =>{
			state.array = action.payload;
			state.cartDopProducts = [];
		},

		addDopProduct: (state, action) =>{
			state.cartDopProducts = [...state.cartDopProducts, action.payload];
		},

		updatePriceDopProduct: (state, action) =>{
			const { id, price } = action.payload;
			state.cartDopProducts = state.cartDopProducts.map(item =>{
				if(item.id === id) {
					return {...item, price:  price}
				} else return item;
			})
		},

		deleteDopProduct: (state, action) =>{
			state.cartDopProducts = state.cartDopProducts.filter(item => item.id !== action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTypesAndSizes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTypesAndSizes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.types = action.payload.types;
				state.sizes = action.payload.sizes;
			})
			.addCase(fetchTypesAndSizes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})
export const selectShowFullProduct = createSelector(
	(state) => state.fullProduct.show,
	(show) => show
);

export const selectArrayFullProduct = createSelector(
	(state) => state.fullProduct.array,
	(array) => array
);
export const selectCartDopProducts = createSelector(
	(state) => state.fullProduct.cartDopProducts,
	(cartDopProducts) => cartDopProducts
);

export const selectTypes = createSelector(
	(state) => state.fullProduct.types,
	(types) => types
);

export const selectSizes = createSelector(
	(state) => state.fullProduct.sizes,
	(sizes) => sizes
);
export const FullProductReducer = FullProductSlice.reducer;

export const {
	setShowFullProduct,
	setArrayFullProduct,
	addDopProduct,
	updatePriceDopProduct,
	deleteDopProduct
} = FullProductSlice.actions;