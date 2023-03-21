import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postAdded } from './postSlice';

const AddPostForm = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChanged = e=> setContent(e.target.value);

    const onSavedPostClicked = () => {
        if(title && content){
            dispatch(
                postAdded(title,content)
            )
            setContent('');
            setTitle('');
        }
    }

  return (
    <section>
        <h2>
            Add a New Form
        </h2>
        <form>
            <label htmlFor='postTitle'>
                Post Title
            </label>
            <input type='text'
            id = 'postTitle'
            name = 'postTitle'
            value = {title}
            onChange = {onTitleChange}
            />
            <label htmlFor='postContent'>Content</label>
            <textarea id = 'postContent'
            name = 'postContent'
            value= {content}
            onChange = {onContentChanged}
            />
            <button type='button' onClick={onSavedPostClicked}> Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm