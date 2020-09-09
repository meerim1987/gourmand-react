import React, { useEffect, useState } from 'react';
import { CommentBox } from '../Components/CommentBox';
import { PageFrame } from '../Components/PageFrame';
import { Loader } from '../Components/Loader';
import { AuthorField } from '../Components/AuthorField';
import SignIn from '../Components/SignIn';
import { ImageGallery } from '../Components/ImageGallery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { CloudTag } from '../Components/CloudTag';
import { useFetch } from '../utils/useFetch';
import { PARAM_ID, replaceParams, CATEGORY, PARAM_CATEGORY } from '../constants/routes';
import { RECIPE } from '../constants/url';

const RecipePage = (props) => {
  const [ticked, setTick] = useState([]);
  const recipeId = props.match.params.id;
  const { data: recipeData, error, fetching } = useFetch(replaceParams(RECIPE, new Map([[PARAM_ID, recipeId]])));

  useEffect(() => {
    if (!recipeData?.ingredients) return;
    setTick(recipeData.ingredients.map(() => false));
  }, [recipeData]);

  const tickFn = (index) => {
    ticked[index] = !ticked[index];
    setTick([...ticked]);
  };
  return (
    <PageFrame>
      {fetching ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : !recipeData || error || recipeData.error ? (
        <div className="error-cont">Recipe not found...</div>
      ) : (
        <React.Fragment>
          <div className="column-content">
            <div className="article-container">
              <article className="post-col-main complete">
                <div className="post-thumb">
                  <a href="javascript:" title="">
                    <img width="100%" src={recipeData.photos.length && recipeData.photos[0].photo} />
                  </a>
                </div>
                <section className="post-body recipe-page">
                  <h1 className="post-title">
                    <a href="javascript:" title={recipeData.title} rel="bookmark">
                      {recipeData.title}
                    </a>
                  </h1>
                  <div className="entry-info">
                    <span>Written by </span>
                    <span id="author-info">
                      <a href="javascript:" title={recipeData.fullName}>
                        {recipeData.fullName}
                      </a>
                    </span>
                    <span className="entry-date">
                      <time className="entry-date comments-link" dateTime={recipeData.addDatetime}>
                        {moment.unix(recipeData.addDatetime).format('MM/DD/YYYY')}
                      </time>
                    </span>
                    <span className="comments-link">in </span>
                    {recipeData.category.map((categ, index) => (
                      <span className="category-link-recipe" key={index}>
                        <Link to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, categ]]))}>{categ.charAt(0).toUpperCase() + categ.slice(1)}</Link>
                      </span>
                    ))}
                  </div>
                  <div className="post-content">
                    <p>{recipeData.description}</p>
                  </div>
                </section>
                <section className="ingredients">
                  <h3>Ingredients</h3>
                  <p></p>
                  <ul>
                    {recipeData.ingredients.map((ingr, index) => (
                      <li key={index} onClick={() => tickFn(index)} className={ticked[index] ? 'clicked' : ''}>
                        <span className={`tick ${ticked[index] ? 'ticked' : ''}`} />
                        {ingr}
                      </li>
                    ))}
                  </ul>
                  <p></p>
                </section>
                <section className="directions">
                  <h3>Directions</h3>
                  <p></p>
                  <ol>
                    {recipeData.directions.map((direction, index) => (
                      <li key={index}>{direction}</li>
                    ))}
                  </ol>
                </section>
                <section className="more-photos">
                  <h3>
                    <em>More photos</em>
                  </h3>
                  <div className="more-photos-col">
                    <ImageGallery pictures={recipeData.photos} />
                  </div>
                </section>
                <CommentBox recipeId={recipeId} />
              </article>
            </div>
            <div className="aside-container">
              <aside>
                <AuthorField data={recipeData} />
                <SignIn />
                <CloudTag />
              </aside>
            </div>
          </div>
        </React.Fragment>
      )}
    </PageFrame>
  );
};

export default RecipePage;
