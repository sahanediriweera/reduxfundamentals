import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id:'1', title: 'Learning redux toolkit', content:'I have hear good things'},
    {id:'2',title:'Slices',content: 'The more I say slice the more I want pizza'}
];

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        postAdded(state,action) {
            state.push(action.payload);
        }
    }
});

export const selectAllPosts = (state)=> state.posts;

export const {postAdded} = postsSlice.actions;

export default postsSlice.reducer;