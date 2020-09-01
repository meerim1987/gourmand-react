import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import moment from 'moment';
import { CATEGORY, PARAM_CATEGORY, PARAM_ID, RECIPE, replaceParams } from '../constants/routes';
import { truncateStr } from '../utils/string';

const DESCRIPTION_MAX_LENGTH = 232;

export const LatestPost = ({ data, fetching, error }) => {
  const recipeLink = data ? replaceParams(RECIPE, new Map([[PARAM_ID, data.recipeId]])) : null;

  return (
    <Fragment>
      {data && !error && !data.error && (
        <div className="recent-post">
          <div className="post-latest">
            <div className="post-thumb">
              <Link to={recipeLink} title={data.title}>
                <img width="100%" src={data.photos[0].photo} />
              </Link>
            </div>
            <section className="post-body">
              <span className="category-link">
                {data.category.map((category, index) => (
                  <span className="category-link-recipe" key={index}>
                    <Link to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, category]]))} rel="category tag">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  </span>
                ))}
              </span>
              <h3 className="post-title">
                <Link to={recipeLink} rel="bookmark" title={data.title}>
                  {data.title}
                </Link>
              </h3>
              <div className="entry-info">
                <span className="entry-date">
                  <time className="entry-date" dateTime={data.addDatetime}>
                    {moment.unix(data.addDatetime).format('MM/DD/YYYY')}
                  </time>
                </span>
                <span className="comments-link">
                  <Link to={'/recipe/' + data.recipeId} title={data.commentsCount}>
                    {data.commentsCount > 1 ? `${data.commentsCount} Comments` : `${data.commentsCount} Comment`}
                  </Link>
                </span>
              </div>
              <div className="post-content">
                <p>{truncateStr(data.description, DESCRIPTION_MAX_LENGTH) + ' If you want to read, […]'}</p>
              </div>
              <div className="readmore-button">
                <Link to={recipeLink} title={'link to ' + data.title}>
                  Read more
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}
      {fetching && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {(error || (data && data.error)) && <div>Products listing not available</div>}
    </Fragment>
  );
};
