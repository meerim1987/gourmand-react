import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { truncateStr } from '../utils/string';
import { CATEGORY, PARAM_CATEGORY, PARAM_ID, RECIPE, replaceParams } from '../constants/routes';

const MAX_POST_CONTENT_LENGTH = 230;

export const RecipeTile = ({ data }) => {
  const recipeLink = replaceParams(RECIPE, new Map([[PARAM_ID, data.id]]));

  return (
    <article className="post-body">
      <figure>
        <Link to={recipeLink}>
          <img src={data.photos.length ? data.photos[0].photo : 'assets/images/some_dessert.jpeg'} width="100%" />
        </Link>
        <figcaption>
          <span className="category-link">
            <Link to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, data.category]]))} rel="category tag">
              {data.category}
            </Link>
          </span>
          <h3 className="post-title">
            <Link to={recipeLink} title={data.title} rel="bookmark">
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
              <Link to={`${recipeLink}/#comments-field`}>{data.commentsCount > 1 ? `${data.commentsCount} Comments` : `${data.commentsCount} Comment`}</Link>
            </span>
          </div>
          <div className="post-content">
            <p>{truncateStr(data.description, MAX_POST_CONTENT_LENGTH) + ' If you want to read, […]'}</p>
          </div>
          <div className="readmore-button">
            <Link to={'/recipe/' + data.id} title={'link to ' + data.title}>
              Continue reading
            </Link>
          </div>
        </figcaption>
      </figure>
    </article>
  );
};
