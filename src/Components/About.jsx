import React from 'react';

export const About = () => (
  <div className="about-wrap">
    <h2 className="article-title">About the Project</h2>
    <div className="about-content-wrap">
      <div className="about-thumb">
        <figure>
          <img width="100%" alt="ReactJS_photo" src="assets/images/react3.jpeg" />
        </figure>
      </div>
      <div className="about-content">
        <p />
        <h2 className="salut-h2">Hi everyone!</h2>
        <p />
        <p>
          This is my personal project on culinary. Since I am interested in different cultures and their foods, love
          degustate exotic dishes, I decided to devote one of my projects to this theme.
        </p>
        <p>
          As you most probably found out or will, the project has recipes of different yammy dishes sorted on 5
          categories. Feel free to navigate on categories and pick the most favourite ones. Or even better post your
          recipe which you think is unique and which in your opinion, should make the cooking world better place today!
        </p>
        <p>
          From my professional point of view, all this was implemented to improve my understanding of{' '}
          <strong className="react-outline">React JS </strong> and especially of how <strong className="react-outline">React hooks</strong> work and showcase my new skills which I gained while
          developing this project. I fell in love with React JS as it seemed to me intuitive and very flexible library.
        </p>
        <p>
          To learn more about the <a href="https://github.com/meerim1987" 
              className="link-github"
              target="_blank"
              title="Link to Gourmand">Gourmand</a> project from inside and see its code and also of other projects, please visit my{' '}
              <a
              className="link-github"
              target="_blank"
              title="Link to github"
              href="https://github.com/meerim1987"
          >
            github.
          </a>
        </p>
      </div>
    </div>
  </div>
);
