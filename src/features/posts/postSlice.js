import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
import {sub} from 'date-fns'

// const initialState = [
//     { id:'1', title: 'Learning redux toolkit', content:'I have hear good things',date:sub(new Date(), {minutes:10}).toISOString(),
//     reactions:{
//         thumbsUp:0,
//         wow:0,
//         heart:0,
//         rocket:0,
//         coffee:0
//     }    
// },
//     {id:'2',title:'Slices',content: 'The more I say slice the more I want pizza',date:sub(new Date(), {minutes:5}).toISOString(),
//     reactions:{
//         thumbsUp:0,
//         wow:0,
//         heart:0,
//         rocket:0,
//         coffee:0
//     }
// }
// ];

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status:'idle',
    error:null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        postAdded:{
            reducer(state,action){
                state.push(action.payload);
            },
            prepare(title,content,userID){
                return {
                    payload:{
                        id:nanoid,
                        title,
                        content,
                        userID,
                        date: new Date().toISOString(),
                        reactions:{
                            thumbsUp:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0
                        },
                    }
                }
            }
        },
        reactionAdded(state,action){
            const {postId,reaction} =action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending,(state,action)=> {
                state.status = 'loadding';
            }).addCase(fetchPosts.fulfilled,(state,action)=> {
                state.status = 'succeeded'

                let min = 1;
                const loadedPosts = action.payload.map(
                    post=> {
                        post.date = sub(new Date(),{minutes:min++}).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                        return post;
                    }
                );
                state.posts =state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected,(state,action)=> {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectAllPosts = (state)=> state.posts.posts;
export const getPostsStatus = (state)=> state.posts.status;
export const getPostError = (state)=> state.posts.error;

export const selectPostById = (state, postId)=>{
    state.posts.posts.find(post=> post.id === postId);
}

export const {postAdded, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;