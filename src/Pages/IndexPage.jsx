import React, { Fragment } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { Link } from 'react-router-dom';
import {Slideshow} from '../Components/Slideshow';
import { AuthorField } from '../Components/AuthorField';
import { LATEST_RECIPE, RANDOM_RECIPE_LIST } from '../constants/url';
import { useFetch } from '../utils/useFetch';
import { SubscribeUser } from '../Components/SubscribeUser';
import { SubscribeNotUser } from '../Components/SubscribeNotUser';
import { RandomRecipeList } from '../Components/RandomRecipeList';
import { MenuCategories_short } from '../constants/data';
import { LatestPost } from '../Components/ProductsList';
import { Loader } from '../Components/Loader';
import { replaceParams, CATEGORY, PARAM_CATEGORY } from '../constants/routes';

export const IndexPage = () => {
  const latestProdData = useFetch(LATEST_RECIPE);

  return (
    <PageFrame>
      <div className="slideshow-wrap">
        <div className="slideshow-overlay" />
        <Slideshow />
      </div>
      <div className="column-dishes-widgets">
        {MenuCategories_short.map((item, index) => (
          <div key={index} className="dishes-widget">
            <div className="widget-thumb-photo-wrap">
              <Link to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, item.category]]))}>
                <figure className="widget-thumb-photo">
                  <img alt="category-image" width="100%" src={'assets/images/' + item.url} />
                  <div className="overlay-dishes-widget">
                    <figcaption className="widget-title">
                      {item.category.toUpperCase().slice(0, 1) + item.category.slice(1)}
                    </figcaption>
                  </div>
                </figure>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="column-content">
        <div className="article-container">
          <article className="post-col-main">
            <h2 className="article-title">Latest Post</h2>
            <LatestPost {...latestProdData} />
          </article>
          <RandomRecipeList path={RANDOM_RECIPE_LIST} />
        </div>
        <div className="aside-container">
          <aside>
            <Fragment>
              {latestProdData.data && <AuthorField data={latestProdData.data} />}
              {latestProdData.fetching && (
                <div className="loader-container">
                  <Loader />
                </div>
              )}
              {latestProdData.error && <div>ERROR!</div>}
            </Fragment>
            {sessionStorage.getItem('isLoggedIn') ? <SubscribeUser /> : <SubscribeNotUser />}
          </aside>
        </div>
      </div>
    </PageFrame>
  );
};
