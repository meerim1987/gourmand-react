import React from 'react';
import { Categories } from '../constants/data';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { useFetch } from '../utils/useFetch';
import { CATEGORIES_INFO } from '../constants/url';
import { CATEGORY, PARAM_CATEGORY, replaceParams } from '../constants/routes';

export const CloudTag = () => {
  const { data: ctgInfo } = useFetch(CATEGORIES_INFO);

  return (
    <>
      {ctgInfo ? (
        <div className="links-cloud-wrap">
          <h3 className="title">Categories</h3>
          <div className="links-cloud">
            {Object.keys(Categories).map((ctg, index) => (
              <Link key={index} to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, ctg]]))}>
                {ctg}
                <span className="ctg-count">{ctgInfo?.[ctg]?.count || 0}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="loader-container">{<Loader />}</div>
      )}
    </>
  );
};
