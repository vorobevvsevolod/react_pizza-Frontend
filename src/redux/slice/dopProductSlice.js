import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchDopProduct = createAsyncThunk('dopProduces/fetchDopProduct', async () =>{
	const { data } = await axios.get('/api/dopProduct');
	return data.message;
})

const DopProductSlice = createSlice({
	name: 'products',
	initialState:{
		dopProducts: [],
		status: '',
		error: ''
	},
	reducers:{
	
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDopProduct.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDopProduct.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.dopProducts = action.payload;
			})
			.addCase(fetchDopProduct.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const DopProductReducer = DopProductSlice.reducer;