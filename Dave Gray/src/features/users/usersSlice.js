import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = [
//     {id:'0',name:'Spider'},
//     {id:'1',name:'Super'},
//     {id:'2',name:'batman'}
// ];


const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state)=>state.users;

export default usersSlice.reducer;