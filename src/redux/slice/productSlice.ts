import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {IProduct} from "../interface/IProduct";
import {StatusFetch} from "../interface/StatusFetch";
import {ITypesProducts} from "../interface/ITypesProducts";
import {RootState} from "../redux";
import {ICombos} from "../interface/Combos/ICombos";
import DOMPurify from 'dompurify';

interface ProductSliceState {
    products: IProduct[],
    types: ITypesProducts[],
    search: string,
    activeType: number,
    totalCount: number,
    currentPage: number,
    limit: number,
    status: StatusFetch,
    combos: ICombos[],
    activeCombo:number,
    error: string
}

interface FetchProducts{
    isCount?: boolean,
    search?: string
}

export const fetchProducts = createAsyncThunk<
    { products: IProduct[]; count: number },
    FetchProducts,
    { state: RootState }
>('products/fetchProducts', async (option, thunkAPI) => {
    const state = thunkAPI.getState();
    const offset = (state.products.currentPage - 1) * state.products.limit;
    const { data } = await axios.get(
        `/api/products?typeId=${DOMPurify.sanitize(state.products.activeType)}&limit=${DOMPurify.sanitize(state.products.limit)}&search=${DOMPurify.sanitize(state.products.search)}&offset=${offset}${option.isCount ? '&isCount=true' : ''}`
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

export const fetchCombos = createAsyncThunk('combos/fetchCombos', async () =>{
    const { data } = await axios.get('/api/combo');
    return data.message as ICombos[];
})

const ProductsSlice = createSlice({
	name: 'products',
	initialState:{
		products: [],
		types: [],
		activeType: 1,
		totalCount: 0,
        search: "",
		currentPage: 1,
		limit: 8,
        combos: [],
        activeCombo: 0,
		status: StatusFetch.START ,
		error: ''
	} as ProductSliceState,
	reducers:{
		setActiveType: (state, action: PayloadAction<number>) =>{
			state.activeType = action.payload
			state.currentPage = 1;
            state.totalCount = 0;
		},
		setCurrentPage: (state,action: PayloadAction<number>) =>{
			state.currentPage = action.payload;
		},

        setSearchValue: (state,action: PayloadAction<string>) =>{
            state.search = action.payload;
        },

        setActiveCombo: (state,action: PayloadAction<number>) =>{
            state.activeCombo = action.payload;

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
                if (action.error.message)
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
                if (action.error.message)
                    state.error = action.error.message;
            })

            //////////////////ProductsTypes
            .addCase(fetchCombos.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchCombos.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.combos = action.payload;
            })
            .addCase(fetchCombos.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                if (action.error.message)
                    state.error = action.error.message;
            })
    }
});


export const ProductsReducer = ProductsSlice.reducer;

export const selectStatusProducts = createSelector(
    (state: RootState) => state.products.status,
    (status) => status
);


export const { setActiveType, setCurrentPage, setSearchValue, setActiveCombo } = ProductsSlice.actions;