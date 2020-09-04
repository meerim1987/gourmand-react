import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../constants/data';
import { FooterItems } from '../constants/data';

export const PageFrame = (props) => {
  let [stickyEnabled, setStickyEnabled] = useState(false);
  const myMenuBar = useRef();
  const myMainNavbarMenu = useRef();

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
                  {sessionStorage.getItem('isLoggedIn') ? (
                    <li className="author-links">
                      <Link to={'/sign-out'}>Sign Out</Link>
                    </li>
                  ) : (
                    <li className="author-links">
                      <Link to="/sign-in">Sign In</Link>
                    </li>
                  )}
                  <li className="username">
                    {sessionStorage.getItem('name') ? `Hi, ${sessionStorage.getItem('name')}` : ''}
                  </li>
                </ul>
              </div>
              <div className="top-social-container">
                <ul className="top-social">
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
                    {!sessionStorage.getItem('isLoggedIn') && (
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
