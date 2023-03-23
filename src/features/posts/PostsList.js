import React from 'react';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import { selectAllPosts } from './postSlice';
import TimeAgo from './TimeAgo';


const PostsList = () => {
    const posts = useSelector(
        //(state)=> state.posts
        selectAllPosts
    );

    const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map(post=>(
        <article key={post.id}>
            <h3>
                {post.title}
            </h3>
            <p>
                {post.content.substring(0,100)}
            </p>
            <p className='postCredit'>
                <PostAuthor userID = {post.userID}/>
                <TimeAgo timestamp={post.date}/>
            </p>
        </article>
    ));

  return (
    <section>
        <h2>posts</h2>
        {renderedPosts}
    </section>
  )
}

export default PostsList