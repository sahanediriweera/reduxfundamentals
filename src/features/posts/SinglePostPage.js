import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import React from 'react'

const SinglePostPage = () => {

    const post = useSelector((state)=>selectPostById(state,postId));

    if(!post){
        return(
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }

  return (
    <div>SinglePostPage</div>
  )
}

export default SinglePostPage