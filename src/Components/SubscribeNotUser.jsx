import React, { useState, useEffect } from 'react';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initFields = {
  fName: '',
  lastName: '',
  email: '',
};

export const SubscribeNotUser = () => {
  const [fields, setFields] = useState({ ...initFields });
  const [errors, setErrors] = useState({
    fNameError: false,
    lastNameError: false,
    emailError: false,
    emailValidError: false,
  });
  const [flipBoxEnabled, setFlipBoxEnabled] = useState(!!sessionStorage.getItem('subscribed'));

  useEffect(() => {
    if (flipBoxEnabled) {
      sessionStorage.setItem('subscribed', true);
    } else {
      sessionStorage.removeItem('subscribed');
    }
  }, [flipBoxEnabled]);

  const subscribeToNwslNewUser = (event) => {
    event.preventDefault();

    const stateToUpdate = {};
    let isValidEmail = false;

    Object.keys(fields).forEach((fieldName) => (stateToUpdate[`${fieldName}Error`] = !fields[fieldName]));

    if (!stateToUpdate.emailError) {
      isValidEmail = EMAIL_REGEXP.test(fields.email);
      stateToUpdate.emailValidError = !isValidEmail;
    }
    setErrors({ ...errors, ...stateToUpdate });

    if (fields.fName && fields.lastName && isValidEmail) {
      setFlipBoxEnabled(true);
      setFields({ ...initFields });
    } else {
      window.toaster.addMessage('The field is required!', 'error');
    }
  };

  const handleChangeInputData = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const unsubscribe = () => {
    setFlipBoxEnabled(false);
  };

  const FNClassName = errors.fNameError ? 'error-active' : '';
  const LNClassName = errors.lastNameError ? 'error-active' : '';
  const EMClassName = errors.emailError || errors.emailValidError ? 'error-active' : '';

  return (
    <section className="subscription-field flip-box">
      <form>
        <div className={'flip-box-inner' + (flipBoxEnabled ? ' flip-box-animated' : '')}>
          <div className="flip-box-front">
            <fieldset>
              <legend className="title">Subscribe to our Newsletter</legend>
              <p>Subscribe to our newsletter and receive new recipes in your inbox.</p>
              <label>
                <input
                  className={FNClassName}
                  value={fields.fName}
                  onChange={handleChangeInputData}
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder="First name"
                  title="First name"
                />
              </label>
              <br />
              <label>
                <input
                  className={LNClassName}
                  value={fields.lastName}
                  onChange={handleChangeInputData}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  title="Last name"
                />
              </label>
              <br />
              <label>
                <input
                  className={EMClassName}
                  value={fields.email}
                  onChange={handleChangeInputData}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  title="Email"
                />
              </label>
              <br />
              <div className="emailValidCheck">{errors.emailValidError ? 'Not a valid e-mail address' : ''}</div>
              <input className="submit-field" type="submit" onClick={subscribeToNwslNewUser} value="Subscribe" />
            </fieldset>
          </div>
          <div className="flip-box-back">
            <fieldset>
              <legend className="title">Congratulations!</legend>
              <h3 className="title">You have been subscribed!</h3>
              <p>You will receive our newsletter and new recipes in your inbox.</p>
              <p className="unsubscribe">
                Click
                <a title="Unsubscribe" href="javascript:" onClick={unsubscribe}>
                  {' '}
                  here
                </a>{' '}
                to unsubscribe.
              </p>
            </fieldset>
          </div>
        </div>
      </form>
    </section>
  );
};
