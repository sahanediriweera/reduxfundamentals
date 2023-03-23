import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectAllPosts,getPostsStatus,getPostError,fetchPosts } from './postSlice';
import { useEffect } from 'react';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {

    const dispatch = useDispatch();
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostError);

    useEffect(()=>{
        if(postsStatus === 'idle'){
            dispatch(fetchPosts());
        }
    },[postsStatus,dispatch]);

    const posts = useSelector(
        //(state)=> state.posts
        selectAllPosts
    );

    let content;
    if(postsStatus === 'loading'){
        content = <p>"Loading..."</p>;
    }else if(postsStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));
        content = orderedPosts.map(post=> <PostsExcerpt key = {post.id} post = {post}/>)
    }else if(postsStatus === 'failed'){
        content = <p>{error}</p>
    }

  return (
    <section>
        <h2>posts</h2>
        {content}
    </section>
  )
}

export default PostsList