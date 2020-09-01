import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Categories } from '../constants/data';
import { Link } from 'react-router-dom';
import { SliderOfPictures } from '../constants/data';
import { replaceParams, CATEGORY, PARAM_CATEGORY } from '../constants/routes';


// Implemented with Carousel component from react-responsive-carousel to add a slideshow behaviour in React
export const Slideshow = () => {
    return (
      <Carousel
        showArrows
        stopOnHover
        autoPlay={true}
        infiniteLoop={true}
        dynamicHeight={true}
        showThumbs={false}
        showStatus={false}
      >
        {SliderOfPictures.map((photo, index) => (
          <div key={index} className="super-slide" style={{ backgroundImage: `url(${photo.url})` }}>
            <div className="overlay">
              <div className="info">
                <Link to={replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, photo.category]]))}>
                  <span className="category">
                    {Object.keys(Categories).map((el, index) => (el === photo.category ? Categories[el].label : ''))}
                  </span>
                </Link>
                <h3>
                  <Link to={'recipe/' + photo.recipeId}>{photo.label}</Link>
                </h3>
                <div className="meta">
                  <Link to={'recipe/' + photo.recipeId}>
                    <p>{photo.intro}</p>
                  </Link>
                </div>
                <div>
                  <Link to={'recipe/' + photo.recipeId}>
                    <input className="carousel-btn" type="button" value="Read More" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    );
};
