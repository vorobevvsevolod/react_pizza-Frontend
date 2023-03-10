import {createSelector, createSlice} from "@reduxjs/toolkit";

const FullProductSlice = createSlice({
	name: 'fullProduct',
	initialState:{
		show: false,
		array: []
	},
	reducers:{
		setShowFullProduct: (state) => {
			state.show = !state.show;
		},
		
		setArrayFullProduct: (state, action) =>{
			state.array = action.payload;
		}
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
export const FullProductReducer = FullProductSlice.reducer;

export const {
	setShowFullProduct,
	setArrayFullProduct
} = FullProductSlice.actions;