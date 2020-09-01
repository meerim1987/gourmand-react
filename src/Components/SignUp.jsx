import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getUrl, SIGNUP } from '../constants/url';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MAX_CHARS = 500;
const LENGTH_ERROR = 'Password should be minimum 8 chars!';
const MATCH_ERROR = 'Passwords do not match!';
const VALIDATION_ERROR = 'Not a valid password (should contain at least one uppercase, one lowercase and one number)!';
const EMAILERROR = 'Not a valid email address!';
const MIN_PASSWORD_LENGTH = 8;

const initFields = {
  fullName: '',
  userName: '',
  email: '',
  summary: '',
  password: '',
  passwordRepeat: '',
};

export const SignUp = () => {
  const [errors, setErrors] = useState({
    fullNameError: false,
    userNameError: false,
    emailError: false,
    summaryError: false,
    passwordError: false,
    passwordRepeatError: false,
    uploadedFilesError: false,
    uploaderReset: false,
    passwordsMatchErrorFlag: false,
    passwordsValidationErrorFlag: false,
    passwordLengthErrorFlag: false,
    checkbox: false,
    emailValidError: false,
  });

  const [fields, setFields] = useState({ ...initFields });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === 'textarea') {
      if (value.length > MAX_CHARS) {
        value = value.substring(0, MAX_CHARS);
        window.toaster.addMessage(`Max limit is ${MAX_CHARS} chars!`, `error`);
      }
    }
    setFields({ ...fields, [name]: value });
  };

  const showPassword = (e) => {
    setErrors({ ...errors, checkbox: e.target.checked });
  };

  const reset = () => {
    setFields({ ...initFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stateToUpdate = {};

    const fieldsArr = ['fullName', 'userName', 'email', 'summary', 'password', 'passwordRepeat'];

    fieldsArr.forEach((fieldName) => {
      stateToUpdate[`${fieldName}Error`] = !fields[fieldName];
    });

    if (!stateToUpdate.emailError) {
      stateToUpdate.emailValidError = !EMAIL_REGEXP.test(fields.email);
    }

    if (!stateToUpdate.passwordError) {
      stateToUpdate.passwordLengthErrorFlag = fields.password.length < MIN_PASSWORD_LENGTH;
      stateToUpdate.passwordsValidationErrorFlag = false;
    }

    if (!stateToUpdate.passwordError && !stateToUpdate.passwordLengthErrorFlag) {
      const str = fields.password;
      stateToUpdate.passwordsValidationErrorFlag = !(/[A-Z]/.test(str) && /[a-z]/g.test(str) && /[0-9]/g.test(str));
      stateToUpdate.passwordLengthErrorFlag = false;
    }

    stateToUpdate.passwordsMatchErrorFlag = fields.password.trim() !== fields.passwordRepeat.trim();
    const dataToSend = {};

    setErrors({ ...errors, ...stateToUpdate });

    if (Object.values(stateToUpdate).reduce((agr, val) => agr || val, false)) {
      window.toaster.addMessage('Please fill in form below!', 'error');
      return;
    }

    const newFields = Object.keys(initFields).filter((fieldName) => fieldName !== 'passwordRepeat');
    newFields.forEach((fieldName) => (dataToSend[fieldName] = fields[fieldName]));

    const rawResponse = await fetch(getUrl(SIGNUP), {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    try {
      const content = await rawResponse.json();

      if (content.success) {
        window.toaster.addMessage('Welcome, gourmand!', 'info');
        reset();
        setRedirect(true);
      } else {
        window.toaster.addMessage(content.message, 'error');
      }
    } catch (e) {
      console.error(e);
      window.toaster.addMessage('Server returned undexpected response...', 'error');
    }
  };

  const FNClassName = errors.fullNameError ? ' error-active' : '';
  const UNClassName = errors.userNameError ? ' error-active' : '';
  const emailClassName = errors.emailError || errors.emailValidError ? ' error-active' : '';
  const summaryClassName = errors.summaryError ? ' error-active' : '';
  const passwordClassName =
    errors.passwordError || errors.passwordsValidationErrorFlag || errors.passwordLengthErrorFlag
      ? ' error-active'
      : '';
  const passwordRepClassName = errors.passwordsMatchErrorFlag ? ' error-active' : '';

  return (
    <section className="login-field">
      {redirect && <Redirect to="/sign-in" />}
      <form>
        <fieldset>
          <legend className="title">Please Sign Up</legend>
          <div className="data-wrap">
            <div className="data-col-1">
              <label>
                <input
                  value={fields.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className={'text' + FNClassName}
                />
              </label>
              <label>
                <input
                  value={fields.userName}
                  onChange={handleChange}
                  type="text"
                  name="userName"
                  placeholder="Username"
                  className={'text' + UNClassName}
                />
              </label>
              <label>
                <input
                  value={fields.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={'text' + emailClassName}
                />
                <div className="password-errors-wrap">{errors.emailValidError && EMAILERROR}</div>
              </label>
              <textarea
                value={fields.summary}
                onChange={handleChange}
                name="summary"
                placeholder="Describe yourself..."
                className={'text' + summaryClassName}
              />
              <label>
                <input
                  value={fields.password}
                  onChange={handleChange}
                  type={errors.checkbox ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={'text ' + passwordClassName}
                  placeholder="Password"
                />
              </label>
              <div className="password-errors-wrap">
                {errors.passwordsValidationErrorFlag && <div>{VALIDATION_ERROR}</div>}
                {errors.passwordLengthErrorFlag && <div>{LENGTH_ERROR}</div>}
              </div>
              <label>
                <input type="checkbox" onChange={showPassword} checked={errors.checkbox} />
                Show password
              </label>
              <label>
                <input
                  value={fields.passwordRepeat}
                  onChange={handleChange}
                  type="password"
                  name="passwordRepeat"
                  className={'text ' + passwordRepClassName}
                  placeholder="Confirm password"
                />
              </label>
              <div className="password-errors-wrap">{errors.passwordsMatchErrorFlag && <div>{MATCH_ERROR}</div>}</div>
            </div>
            <div className="data-col-2" />
          </div>
          <input id="signUp" onClick={handleSubmit} type="submit" value="Sign up" />
          <div className="result-cont" />
        </fieldset>
      </form>
    </section>
  );
};
