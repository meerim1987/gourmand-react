import React, { useState, useEffect, useRef } from 'react';
import { Loader } from './Loader';
import { COMMENT_LIST, getUrl } from '../constants/url';
import { PARAM_COUNT, PARAM_FIRST, PARAM_ID } from '../constants/routes';
import { useLocation } from 'react-router';

const COMMENTS_COUNT_ON_PAGE = 3;
const STATE = {
  LOADING: 1,
  LOAD_MORE: 2,
  EMPTY: 3,
};
const CommentItem = ({ comment: { userAvatar, fullName, date, text } }) => {
  return (
    <li>
      <div className="comment-area">
        <div className="avatar-wrap">
          <figure>
            <img height="72" src={userAvatar} className="avatar" />
          </figure>
        </div>
        <div className="comment-wrap">
          <cite className="fn">
            <a href="javascript:">{fullName}</a>
          </cite>
          <div className="comment-metadata">
            <a href="javascript:">{date}</a>
          </div>
          <div className="comment-body">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export const CommentList = ({ newComment, recipeId }) => {
  let [list, setList] = useState([]);
  let [offset, setOffset] = useState(0);
  let [state, setState] = useState(STATE.LOADING);
  let [count, setCount] = useState(0);
  const {hash} = useLocation();

  const getList = async () => {
    setState(STATE.LOADING);

    const result = await fetch(
      getUrl(
        COMMENT_LIST,
        new Map([
          [PARAM_ID, recipeId],
          [PARAM_FIRST, offset],
          [PARAM_COUNT, COMMENTS_COUNT_ON_PAGE],
        ])
      )
    );
    const data = await result.json();
    const newOffset = offset + COMMENTS_COUNT_ON_PAGE;
    setList([...list, ...data.list]);
    setOffset(newOffset);
    setState(data.count > newOffset ? STATE.LOAD_MORE : STATE.EMPTY);
    setCount(data.count);
  };

  // Anchor link to comments field
  useEffect(() => {
    if (hash) {
        const targetElem = document.getElementById(hash.replace('#', ''));
        if(targetElem) {
          targetElem.scrollIntoView({
            behavior: 'smooth'
          });
        }       
    }
  }, []);


  const myRef = useRef();

  // Lazy load of comments with Intersection observer
  const intersectionCallback = async(entries, fn) => {
    if (entries[0].isIntersecting) {   
        const targetElem = document.getElementById('comments-field');
        targetElem.scrollIntoView({
          behavior: 'smooth'
        });
        await getList();
        fn();    
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const target = myRef.current;
    const obs = new IntersectionObserver(
      (entries) => intersectionCallback(entries, () => obs.unobserve(target)), 
      options
    );
    obs.observe(target);
  }, []);

  useEffect(() => {
    setList([newComment, ...list]);
    setCount(count + 1);
  }, [newComment]);

  return (
    <section className="comments" id="comments-field">
      <h3 ref={myRef}>{count} Comments</h3>
      <ol className="commentslist">
        {list.map((el, index) => {
          return <CommentItem comment={el} key={index} />;
        })}
      </ol>
      <div className="form-submit">
        {state === STATE.LOADING && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {state === STATE.LOAD_MORE && (
          <input className="loadMore-button" type="button" onClick={getList} value="Load More..." />
        )}
      </div>
    </section>
  );
};
