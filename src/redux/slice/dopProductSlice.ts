import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {StatusFetch} from "../interface/StatusFetch";
import {IDopProduct} from "../interface/IDopProduct";
import {RootState} from "../redux";


interface DopProductsSliceState {
    dopProducts: IDopProduct[];
	status: StatusFetch;
	error: string;
}



export const fetchDopProduct = createAsyncThunk('dopProduces/fetchDopProduct', async () =>{
	const { data } = await axios.get('/api/dopProduct');
	return data.message as IDopProduct[];
})

const DopProductSlice = createSlice({
	name: 'products',
	initialState:{
		dopProducts: [],
		status: StatusFetch.LOADING,
		error: ''
	} as DopProductsSliceState,
	reducers:{
	
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDopProduct.pending, (state) => {
				state.status = StatusFetch.LOADING;
			})
			.addCase(fetchDopProduct.fulfilled, (state, action) => {
				state.status = StatusFetch.SUCCESS;
				state.dopProducts = action.payload;
			})
			.addCase(fetchDopProduct.rejected, (state, action) => {
				state.status = StatusFetch.FAILED;
                if(action.error.message)
				    state.error = action.error.message;
			});
	}
})

export const selectDopProducts = createSelector(
    (state: RootState) => state.dopProduct.dopProducts,
    (dopProducts) => dopProducts
);



export const DopProductReducer = DopProductSlice.reducer;