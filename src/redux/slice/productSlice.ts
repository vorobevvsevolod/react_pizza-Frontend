import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {IProduct} from "../interface/IProduct";
import {StatusFetch} from "../interface/StatusFetch";
import {ITypesProducts} from "../interface/ITypesProducts";
import {RootState} from "../index";

interface ProductSliceState {
    products: IProduct[],
    types: ITypesProducts[],
    activeType: number,
    totalCount: number,
    currentPage: number,
    limit: number,
    status: StatusFetch,
    error: string
}

interface FetchProducts{
    offset: number
    isCount?: boolean
}

export const fetchProducts = createAsyncThunk<
    { products: IProduct[]; count: number },
    FetchProducts,
    { state: RootState }
>('products/fetchProducts', async (option, thunkAPI) => {
    const state = thunkAPI.getState();
    const { data } = await axios.get(
        `/api/products?typeId=${state.products.activeType}&limit=${state.products.limit}&offset=${option.offset}${option.isCount ? '&isCount=true' : ''}`
    );
    return {
        products: data.message.products as IProduct[],
        count: data.message.count ? data.message.count : state.products.totalCount,
    };
});

export const fetchProductsTypes = createAsyncThunk('productsTypes/fetchProductsTypes', async () =>{
	const { data } = await axios.get('/api/productstypes');
	return data.message as ITypesProducts[];
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
		status: StatusFetch.LOADING,
		error: ''
	} as ProductSliceState,
	reducers:{
		setActiveType: (state, action: PayloadAction<number>) =>{
			state.activeType = action.payload
			state.currentPage = 1;
		},
		setCurrentPage: (state,action: PayloadAction<number>) =>{
			state.currentPage = action.payload;
		}

	},
	extraReducers: (builder) => {
		builder
			//////////////////Pizzas
			.addCase(fetchProducts.pending, (state) => {
				state.status = StatusFetch.LOADING;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = StatusFetch.SUCCESS;
				state.products = action.payload.products;
				state.totalCount = action.payload.count;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = StatusFetch.FAILED;
                if(action.error.message)
				    state.error = action.error.message;
			})
			
			//////////////////ProductsTypes
			.addCase(fetchProductsTypes.pending, (state) => {
				state.status = StatusFetch.LOADING;
			})
			.addCase(fetchProductsTypes.fulfilled, (state, action) => {
				state.status = StatusFetch.SUCCESS;
				state.types = action.payload;
			})
			.addCase(fetchProductsTypes.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                if(action.error.message)
                    state.error = action.error.message;
			});
	}
})


export const ProductsReducer = ProductsSlice.reducer;
export const { setActiveType, setCurrentPage } = ProductsSlice.actions;