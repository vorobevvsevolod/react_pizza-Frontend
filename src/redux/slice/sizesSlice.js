import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchSizes = createAsyncThunk('sizes/fetchSizes', async () =>{
	const { data } = await axios.get('/api/sizes');
	return data.message;
})

const SizesSlice = createSlice({
	name: 'products',
	initialState:{
		sizes: [],
		status: '',
		error: ''
	},
	reducers:{
	
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSizes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchSizes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.sizes = action.payload;
			})
			.addCase(fetchSizes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const SizesReducer = SizesSlice.reducer;