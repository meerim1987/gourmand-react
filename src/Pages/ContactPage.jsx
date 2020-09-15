import React, { useState } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { AuthorField } from '../Components/AuthorField';
import { PersonalData } from '../constants/data';

const URL_REGEXP = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MAX_CHARS = 600;

const ContactPage = () => {
  const initState = {
    name: '',
    email: '',
    website: '',
    message: '',
    submitted: false,
  };

  const [state, setState] = useState(initState);
  const userAuthenticated = sessionStorage.getItem('isLoggedIn');
  const reset = () => setState({ ...initState });

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'message' && value.length > MAX_CHARS) {
      value = value.substring(0, MAX_CHARS);
      window.toaster.addMessage(`Sorry, max allowed number of chars is ${MAX_CHARS}`, 'error');
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, submitted: true });

    let success = state.message && (!state.website || URL_REGEXP.test(state.website));

    if (!userAuthenticated) {
      success = success && state.name && state.email && EMAIL_REGEXP.test(state.email);
    }

    if (success) {
      window.toaster.addMessage('Thank you! Your message has been submitted!', 'info');
      reset();
    } else {
      window.toaster.addMessage('Please fill in the form!', 'error');
    }
  };

  const nameClassName = state.submitted && !state.name ? 'error-active' : '';
  const emailClassName = state.submitted && (!state.email || !EMAIL_REGEXP.test(state.email)) ? 'error-active' : '';
  const urlClassName = state.submitted && state.website && !URL_REGEXP.test(state.website) ? 'error-active' : '';
  const messageClassName = state.submitted && !state.message ? 'error-active' : '';
  const showEmailRegexpError = state.email && !EMAIL_REGEXP.test(state.email);
  const showUrlRegexpError = state.website && !URL_REGEXP.test(state.website);

  return (
    <PageFrame>
      <div className="column-content">
        <div className="article-container">
          <article className="contact-wrap">
            <header className="contact-header">
              <h1 className="entry-title">Contact</h1>
            </header>
            <div className="contact-content">
              <form>
                {!userAuthenticated && (
                  <>
                    <div className="contact-name">
                      <label>
                        Name
                        <span className="form-required-label">*</span>
                        <input
                          type="text"
                          className={nameClassName}
                          name="name"
                          value={state.name}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div className="contact-email">
                      <label>
                        Email
                        <span className="form-required-label">*</span>
                        <input
                          type="email"
                          className={emailClassName}
                          name="email"
                          value={state.email}
                          onChange={handleChange}
                        />
                        {showEmailRegexpError && <div className="password-errors-wrap">This is not valid email!</div>}
                      </label>
                    </div>
                  </>
                )}
                <div className="contact-website">
                  <label>
                    Website / URL
                    <input
                      type="url"
                      name="website"
                      className={urlClassName}
                      value={state.website}
                      onChange={handleChange}
                    />
                    {showUrlRegexpError && <div className="password-errors-wrap">Enter a valid url!</div>}
                  </label>
                </div>
                <div>
                  <label>
                    Comment or Message
                    <span className="form-required-label">*</span>
                    <textarea
                      className={messageClassName}
                      name="message"
                      value={state.message}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="contact-submit">
                  <input type="submit" value="Submit" onClick={handleSubmit} />
                </div>
              </form>
            </div>
          </article>
        </div>
        <div className="aside-container">
          <AuthorField data={PersonalData} />
        </div>
      </div>
    </PageFrame>
  );
};

export default ContactPage;
