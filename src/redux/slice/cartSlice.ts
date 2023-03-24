import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import { ICartItem } from "../interface/ICartItem";
import {RootState} from "../index";
import {StatusFetch} from "../interface/StatusFetch";


interface CartSliceState {
    cart: ICartItem[];
    show: boolean;
    index: number;
    status: StatusFetch;
    error: string;
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () =>{
    const { data } = await axios.get('/api/basketpizza');
    return data.message as ICartItem[];
})

const CartSlice = createSlice({
    name: 'cart',
    initialState:{
        cart: [],
        show: false,
        index: 0,
        status: StatusFetch.LOADING,
        error: ''
    } as CartSliceState,
    reducers:{
        setShowCart: (state) =>{
            state.show = !state.show;
        },
        addProductInCart: (state, action: PayloadAction<ICartItem>) =>{
            const { id } = action.payload;
            if(!id){
                state.cart = [...state.cart, {...action.payload, id: ++state.index}]
            }else{
                state.cart = [...state.cart, action.payload]
            }
        },
        deleteProductCart: (state, action: PayloadAction<number>) =>{
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        deleteDopProductCart: (state, action: PayloadAction<{id: number, dopProductId: number, price: number}>) =>{
            const { id, dopProductId, price } = action.payload

            state.cart = state.cart.map(item => {
                if (item.id === id && item.dopProducts) {
                    return {...item, price: item.price - price, dopProducts: item.dopProducts.filter(item => item !== dopProductId)}
                } else return item
            })
        },
        updateQuantityProductInCart: (state, action: PayloadAction<{id: number, quantity: number}>) =>{
            const { id, quantity } = action.payload;
            state.cart = state.cart.map(item =>{
                if(item.id === id)
                    return {...item, quantity};
                return item;
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state: CartSliceState) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchCart.fulfilled, (state: CartSliceState, action: PayloadAction<ICartItem[]>) => {
                state.status = StatusFetch.SUCCESS;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state: CartSliceState, action) => {
                state.status = StatusFetch.FAILED;
                if(action.error.message)
                    state.error = action.error.message;
            });
    }
})


export const CartReducer = CartSlice.reducer;
export const selectCart = createSelector(
    (state: RootState) => state.cart.cart,
    (cart) => cart
);

export const selectShowCart = createSelector(
    (state: RootState) => state.cart.show,
    (show) => show
);

export const {
    setShowCart,
    addProductInCart,
    deleteProductCart,
    updateQuantityProductInCart,
    deleteDopProductCart
} = CartSlice.actions;
