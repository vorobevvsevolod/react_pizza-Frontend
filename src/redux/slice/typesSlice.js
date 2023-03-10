import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchTypes = createAsyncThunk('types/fetchTypes', async () =>{
	const { data } = await axios.get('/api/types');
	return data.message;
})

const TypesSlice = createSlice({
	name: 'products',
	initialState:{
		types: [],
		status: '',
		error: ''
	},
	reducers:{
	
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTypes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTypes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.types = action.payload;
			})
			.addCase(fetchTypes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})


export const TypesReducer = TypesSlice.reducer;