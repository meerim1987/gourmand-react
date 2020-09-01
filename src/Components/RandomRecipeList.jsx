import React, { useEffect, useRef, Fragment } from 'react';
import { Loader } from './Loader';
import { RecipeTile } from './RecipeTile';
import { useFetch } from '../utils/useFetch';

export const RandomRecipeList = (props) => {
  const { data, fetching, error, get } = useFetch(props.path, true);
  const myRef = useRef();

  // Lazy load for random recipes with Intersection observer
  const intersectionCallback = (entries) => {
    if (entries[0].isIntersecting) {
      get();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const obs = new IntersectionObserver(intersectionCallback, options);
    const target = myRef.current;
    obs.observe(target);
  }, []);

  return (
    <Fragment>
      {data && (
        <div className="column-articles">
          {data.slice(0, 6).map((el, index) => (
            <RecipeTile data={el} key={index} />
          ))}
        </div>
      )}

      {fetching && (
        <div ref={myRef} className="loader-container">
          <Loader />
        </div>
      )}

      {error && <div>ERROR!</div>}
    </Fragment>
  );
};
