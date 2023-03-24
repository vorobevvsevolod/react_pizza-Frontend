import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "../../axios";
import {StatusFetch} from "../interface/StatusFetch";
import {RootState} from "../index";


interface UserSliceState{
    token: string,
    username: string,
    email: string,
    phone: string,

    status: StatusFetch,
    error: string
}

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async () =>{
	const { data } = await axios.get('/api/user/me')
	return data.message as {username: string; email: string; phone: string}
})

const UserSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: '',
	    username: '',
	    email: '',
	    phone: '',
	    
	    status: StatusFetch.LOADING,
	    error: ''
    } as UserSliceState,
    reducers:{
        getTokenByCookie: state => {
            const token = localStorage.getItem('token');
            if(token){
                state.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
        clearTokenUser: state => {
            state.token = '';
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            },
        setTokenUser: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
        },
	    
	    
	    changeEmailUser: (state, action: PayloadAction<string>) =>{
		    state.email = action.payload
	    },
	    changeUsername: (state, action: PayloadAction<string>) =>{
		    state.username = action.payload
	    },
	    changePhone: (state, action: PayloadAction<string>) =>{
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
				state.status = StatusFetch.LOADING;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.status = StatusFetch.SUCCESS;
				state.username = action.payload.username;
				state.email = action.payload.email;
				state.phone = action.payload.phone;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.status = StatusFetch.FAILED;
                if(action.error.message)
				    state.error = action.error.message;
			});
	}
})

export const selectToken = createSelector(
	(state: RootState) => state.userInfo.token,
	(token) => token
);

export const selectUserInfo = createSelector(
	(state: RootState) => state.userInfo,
	(userInfo) => ({
		username: userInfo.username,
		email: userInfo.email,
		phone: userInfo.phone,
	})
);


export const TokenUserReducer = UserSlice.reducer;
export const {getTokenByCookie, clearTokenUser, changeEmailUser, changePhone, changeUsername, setTokenUser} = UserSlice.actions;
