import React from 'react';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userID,setUserID] = useState('');
    const [addRequestStatus,setAddRequestStatus] = useState('idle');
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChanged = e=> setContent(e.target.value);
    const onAuthorChanged = e=> setUserID(e.target.value);

    const onSavedPostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userID })).unwrap()

                setTitle('')
                setContent('')
                setUserID('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const canSave = [title,content,userID].every(Boolean) && addRequestStatus === 'idle';

    const userOptions = users.map(user => (
        <option key={user.id} value = {user.id}>
            {user.name}
        </option>
    ))

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
            <select id = 'postAuthor' value={userID} onChange={onAuthorChanged}>
                <option value=''></option>
                {userOptions}
            </select>
            <label htmlFor='postContent'>Content</label>
            <textarea id = 'postContent'
            name = 'postContent'
            value= {content}
            onChange = {onContentChanged}
            />
            <button type='button' onClick={onSavedPostClicked} disabled = {!canSave}> Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm