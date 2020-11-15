import React, { useState, useLayoutEffect, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../constants/data';
import { FooterItems } from '../constants/data';
import { AuthContext } from '../Application';
import { SearchIcon } from '../static/svg';
import { useFetch } from '../utils/useFetch';
import { SEARCH_RECIPE } from '../constants/url';
import { SearchResults } from './SearchResults';


export const PageFrame = (props) => {
  let [stickyEnabled, setStickyEnabled] = useState(false);
  let [searchVal, setSearchVal] = useState("");
  let [searchRes, setSearchRes] = useState(null);
  const searchMinLength = 3;


  const {data, get} = useFetch(`${SEARCH_RECIPE}/${searchVal}`, true);

  const myMenuBar = useRef();
  const myMainNavbarMenu = useRef();
  
  const {userData} = useContext(AuthContext);

  useLayoutEffect(() => {
    const menuBarHeight = myMenuBar.current.clientHeight;
    const sticky = myMenuBar.current.offsetTop + menuBarHeight;

    const enableStickyMenu = () => {
      setStickyEnabled(window.pageYOffset >= sticky);
    };

    window.addEventListener('scroll', enableStickyMenu);

    return () => window.removeEventListener('scroll', enableStickyMenu);
  }, []);

  const toggleMenu = (event) => {
    const target = event.target;
    const parentNode = target.parentNode;

    if (parentNode.classList.contains('folded-menu-link') || parentNode.classList.contains('folded-menu-icon')) {
      if (parentNode.classList.contains('open')) {
        parentNode.classList.remove('open');
        myMainNavbarMenu.current.classList.remove('menu-open');
        return;
      }
      parentNode.classList.add('open');
      myMainNavbarMenu.current.classList.add('menu-open');
    }
  };

  // Debounce optimiz interval
  const DEBOUNCE_INTVL = 1000;

  // Search recipe logic
  const handleKeyUp = ({target:{value}}) => {
    const val = value.trim();
    setSearchVal(val);
  }

  // Remove search results on click of search cancel button 
  const removeSearchResults = () => {
    setSearchRes(null);
    setSearchVal('');
  }

  // Debounce optimization logic for Search 
  useEffect(() => {
      setSearchRes(null);
      if (!searchVal || searchVal.length < searchMinLength) return;
      const timeOutId = setTimeout(() => get(), DEBOUNCE_INTVL);
      return () => clearTimeout(timeOutId);
  }, [searchVal]);

  // Setting search results to state on every change of data
  useEffect(() => {                                                  
    setSearchRes(data);
  }, [data]);

  console.log(data, searchRes, searchVal, 'PPP')

  return (
    <div className="page-wrap">
      <div className="inner-container">
        <header className="site-header">
          <nav className="top-navbar">
            <div className="top-navbar-container">
              <div className="top-menu-container">
                <ul className="top-menu">
                  <li className="about-menu-item">
                    <Link to="/about">About</Link>
                  </li>
                  {userData?.isLoggedIn ? (
                    <li className="author-links">
                      <Link to={'/sign-out'}>Sign Out</Link>
                    </li>
                  ) : (
                    <li className="author-links">
                      <Link to="/sign-in">Sign In</Link>
                    </li>
                  )}
                  <li className="username">
                    {userData?.user && `Hi, ${userData.user}` }
                  </li>
                </ul>
              </div>
              <div className="top-social-container">
                <ul className="top-social">
                  <li className="search-query-wrapper">
                      <div class="search-query-content">
                        <label>
                          <input ref={element=>(element||{}).onsearch=removeSearchResults} onKeyUp={handleKeyUp} type="search" 
                            className="search-query" placeholder="Search the recipe" aria-label="Search through site content"/>
                        </label>
                      </div>
                      <button>
                        <SearchIcon/>
                      </button>
                      {searchRes && <SearchResults data={searchRes} searchItem={searchVal}/> }
                  </li>
                  <li className="zoom-social-icons-list-item">
                    <Link className="zoom-social-icons-list-link" to="/contact">
                      <span title="Contact" className="socicon socicon-mail" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="inner-wrap">
            <div className="navbar-brand">
              <h1>
                <Link to={'/'} title="Gourmand. Worldwide food recipes">
                  Gourmand
                </Link>
              </h1>
              <p className="tagline">Worldwide food recipes</p>
            </div>
          </div>
          <div className="sticky-wrap-cont">
            <div ref={myMenuBar} className={'sticky-wrap' + (stickyEnabled ? ' sticky' : '')}>
              <nav className="main-navbar">
                <div className="folded-menu">
                  <a className="folded-menu-link" href="javascript:" onClick={toggleMenu}>
                    <span className="folded-menu-icon">
                      <span className="folded-menu-iconbar" />
                      <span className="folded-menu-iconbar" />
                      <span className="folded-menu-iconbar" />
                    </span>
                    <span className="folded-menu-txt">MENU</span>
                  </a>
                </div>
                <div className="menu-wrap-main">
                  <ul ref={myMainNavbarMenu} className="main-navbar-menu">
                    {MenuItems.map((el, index) => (
                      <li title={el.label} key={index}>
                        <Link to={el.url}>{el.label}</Link>
                      </li>
                    ))}
                    {!userData.isLoggedIn && (
                      <li title="SignUp">
                        <Link to={'/sign-up'}>Sign Up</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <main>{props.children}</main>
      </div>
      <footer>
        <div className="footer-menu-wrap">
          <ul className="footer-menu">
            {FooterItems.map((item, index) => (
              <li title={item.label} key={index}>
                <Link to={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="site-info">
            <span className="copyright">Copyright © 2020 Gourmand</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
