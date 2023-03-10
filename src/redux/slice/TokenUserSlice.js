import {  createSlice } from '@reduxjs/toolkit';
import axios from "../../axios";

const TokenUserSlice = createSlice({
    name: 'TokenUser',
    initialState: {
        token: '',
    },
    reducers:{
        getTokenByCookie: state => {
            const token = localStorage.getItem('token');
            state.token = token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        clearTokenUser: state => {
            state.token = '';
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            },
        setTokenUser: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
        }
    }
})




export const TokenUserReducer = TokenUserSlice.reducer;
export const {getTokenByCookie, clearTokenUser,setTokenUser } = TokenUserSlice.actions;
