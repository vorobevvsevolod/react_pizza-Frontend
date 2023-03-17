import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async () =>{
	const { data } = await axios.get('/api/user/me')
	return data.message
})

const UserSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: '',
	    username: '',
	    email: '',
	    phone: '',
	    
	    status: '',
	    error: ''
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
        },
	    
	    
	    changeEmailUser: (state, action) =>{
		    state.email = action.payload
	    },
	    changeUsername: (state, action) =>{
		    state.username = action.payload
	    },
	    changePhone: (state, action) =>{
		    state.phone = action.payload
	    },
	    clearInfoUser: state => {
		    state.username = '';
		    state.email = '';
		    state.phone = ''
	    }
    },
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserInfo.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.username = action.payload.username;
				state.email = action.payload.email;
				state.phone = action.payload.phone;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
})

export const selectToken = createSelector(
	(state) => state.userInfo.token,
	(token) => token
);

export const selectUserInfo = createSelector(
	(state) => state.userInfo,
	(userInfo) => ({
		username: userInfo.username,
		email: userInfo.email,
		phone: userInfo.phone,
	})
);


export const TokenUserReducer = UserSlice.reducer;
export const {getTokenByCookie, clearTokenUser, setTokenUser, changeEmailUser, changePhone, changeUsername, clearInfoUser } = UserSlice.actions;
