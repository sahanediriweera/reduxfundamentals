import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:'0',name:'Spider'},
    {id:'1',name:'Super'},
    {id:'2',name:'batman'}
];

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
         
    }
});

export const selectAllUsers = (state)=>state.users;

export default usersSlice.reducer;