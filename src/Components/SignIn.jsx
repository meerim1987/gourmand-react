import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useFetch } from '../utils/useFetch';
import { LOGIN } from '../constants/url';
import { PARAM_EMAIL, PARAM_PASSWORD, replaceParams } from '../constants/routes';

const initForms = {
  userName: '',
  password: '',
};

const initFormErrors = {
  usernameError: false,
  passwordError: false,
};

const SignIn = () => {
  const [fields, setFields] = useState({ ...initForms });
  const [errors, setErrors] = useState({ ...initFormErrors });
  const history = useHistory();

  const { data: content, get } = useFetch(
    replaceParams(
      LOGIN,
      new Map([
        [PARAM_EMAIL, fields?.userName],
        [PARAM_PASSWORD, fields?.password],
      ])
    ),
    true,
    { credentials: 'include' }
  );

  useEffect(() => {
    if (content === null) return;

    if (content.success) {
      sessionStorage.setItem('isLoggedIn', true);
      reset();
      const fullName = content.fullName;
      window.toaster.addMessage('Welcome, ' + fullName + '!', 'info');
      sessionStorage.setItem('name', fullName);

      // Redirect to previous page or to homepage
      if (sessionStorage.getItem('prevUrl')) {
        history.push(sessionStorage.getItem('prevUrl'));
      } else {
        history.push('/');
      }
    } else {
      window.toaster.addMessage('Not a valid username or password!', 'error');
    }
  }, [content]);

  const handleChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const reset = () => {
    setFields({ ...initForms });
    setFields({ ...initFormErrors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateUpdate = {};
    Object.keys(initForms).forEach((fieldName) => (stateUpdate[`${fieldName}Error`] = !fields[fieldName]));
    setErrors(stateUpdate);

    if (!fields.userName || !fields.password) {
      window.toaster.addMessage('The field is required!', 'error');
    } else {
      get();
    }
  };

  return (
    <section className="login-field">
      <form>
        <fieldset>
          <legend className="title">Please log in</legend>
          <label>
            <input
              value={fields.userName}
              onChange={handleChange}
              type="text"
              name="userName"
              placeholder="Username"
              className={'text' + (errors.userNameError ? ' error-active' : '')}
            />
          </label>
          <label>
            <input
              value={fields.password}
              onChange={handleChange}
              type="password"
              name="password"
              className={'text' + (errors.passwordError ? ' error-active' : '')}
              placeholder="Password"
            />
          </label>
          <input type="submit" value="Login" onClick={handleSubmit} />
          <div className="result-cont" />
        </fieldset>
      </form>
    </section>
  );
};

export default SignIn;
