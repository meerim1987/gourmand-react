import React, { useState, useEffect } from 'react';
import { CommentList } from './CommentList';
import { Loader } from './Loader';
import { useFetch } from '../utils/useFetch';
import { ADD_COMMENT } from '../constants/url';

const STATE = { LOADING: 1, LOADED: 2 };

export const CommentBox = (props) => {
  let [comment, setComment] = useState('');
  let [newComment, setNewComment] = useState({ id: 0 });
  let [loaderState, setLoader] = useState(STATE.LOADED);
  const [error, setError] = useState(false);

  const handleTextarea = ({ target: { value } }) => {
    setComment(value);
  };

  const { data: content, get } = useFetch(ADD_COMMENT, true, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentText: comment,
      recipeId: props.recipeId,
    }),
    credentials: 'include',
  });

  useEffect(() => {
    if (content === null) return;

    if (content.success) {
      window.toaster.addMessage('Comment was successfully added!', 'info');
      setComment('');
      setLoader(STATE.LOADED);
      setNewComment(content.comment);
    } else {
      window.toaster.addMessage('Server returned error', 'error');
    }
  }, [content]);

  const submitComment = async () => {
    if (!comment) {
      window.toaster.addMessage('Please enter your comment here!', 'error');
      setError(true);
      return;
    }
    setError(false);
    setLoader(STATE.LOADING);
    get();
  };

  return (
    <section className="comment-respond">
      <div className="article-container">
        {sessionStorage.getItem('isLoggedIn') && (
          <section className="comment-respond">
            <h3 className="comment-respond-title">Leave a Comment</h3>
            <p>
              <label htmlFor="comment">Message</label>
              <textarea
                className={error ? 'textar-error' : ''}
                cols="35"
                rows="5"
                value={comment}
                onChange={handleTextarea}
                placeholder="Please comment here..."
              />
            </p>
            <div className="form-submit">
              {loaderState === STATE.LOADING && (
                <div className="loader-container">
                  <Loader />
                </div>
              )}
              {loaderState === STATE.LOADED && <input type="button" onClick={submitComment} value="Post Comment" />}
            </div>
          </section>
        )}
        <CommentList newComment={newComment} recipeId={props.recipeId} />
        {!sessionStorage.getItem('isLoggedIn') && <div className="comments-notice">You need to sign in to comment</div>}
      </div>
    </section>
  );
};
