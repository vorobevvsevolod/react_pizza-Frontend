import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {ITypesPizza} from "../interface/ITypesPizzas";
import {ISizesPizza} from "../interface/ISizesPizzas";
import {StatusFetch} from "../interface/StatusFetch";
import {IDopProduct} from "../interface/IDopProduct";
import {RootState} from "../index";
import {IProduct} from "../interface/IProduct";

interface FullProductSliceState{
    show: boolean,
    product: IProduct,
    types: ITypesPizza[],
    sizes: ISizesPizza[],
    cartDopProducts: IDopProduct[],
    status: StatusFetch,
    error: string
}
export const fetchTypesAndSizes = createAsyncThunk('typesSizes/fetchTypesAndSizes', async () =>{
	const dataTypes = await axios.get('/api/types');
	const dataSizes = await axios.get('/api/sizes');
	return {types: dataTypes.data.message as ITypesPizza[], sizes: dataSizes.data.message as ISizesPizza[]}
})
const FullProductSlice = createSlice({
	name: 'fullProduct',
	initialState:{
		show: false,
		product: {
            id: 0,
            name: '',
            price: 0,
            img_url: '',
            description: '',
            productsTypeId: 0,
        },
		types: [],
		sizes: [],
		cartDopProducts: [],
		status: StatusFetch.LOADING,
		error: ''
	} as FullProductSliceState,

	reducers:{
		setShowFullProduct: (state) => {
			state.show = !state.show;
			if(!state.show) state.product = {
                id: 0,
                name: '',
                price: 0,
                img_url: '',
                description: '',
                productsTypeId: 0,
            };
		},
		
		setArrayFullProduct: (state, action: PayloadAction<IProduct>) =>{
			state.product = action.payload;
			state.cartDopProducts = [];
		},

		addDopProduct: (state, action: PayloadAction<IDopProduct>) =>{
			state.cartDopProducts = [...state.cartDopProducts, action.payload];
		},

		updatePriceDopProduct: (state, action:PayloadAction<{ id: number; price: number; }>) =>{
			const { id, price } = action.payload;
			state.cartDopProducts = state.cartDopProducts.map(item =>{
				if(item.id === id) {
					return {...item, price:  price}
				} else return item;
			})
		},

		deleteDopProduct: (state, action: PayloadAction<number>) =>{
			state.cartDopProducts = state.cartDopProducts.filter(item => item.id !== action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTypesAndSizes.pending, (state) => {
				state.status = StatusFetch.LOADING;
			})
			.addCase(fetchTypesAndSizes.fulfilled, (state, action) => {
				state.status = StatusFetch.SUCCESS;
				state.types = action.payload.types;
				state.sizes = action.payload.sizes;
			})
			.addCase(fetchTypesAndSizes.rejected, (state, action) => {
				state.status = StatusFetch.FAILED;
                if(action.error.message)
				    state.error = action.error.message;
			});
	}
})
export const selectShowFullProduct = createSelector(
	(state: RootState) => state.fullProduct.show,
	(show) => show
);

export const selectArrayFullProduct = createSelector(
	(state: RootState) => state.fullProduct.product,
	(array) => array
);
export const selectCartDopProducts = createSelector(
	(state: RootState) => state.fullProduct.cartDopProducts,
	(cartDopProducts) => cartDopProducts
);

export const selectTypes = createSelector(
	(state: RootState) => state.fullProduct.types,
	(types) => types
);

export const selectSizes = createSelector(
	(state: RootState) => state.fullProduct.sizes,
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