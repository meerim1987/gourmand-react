import React, { useState } from 'react';

export const SubscribeUser = () => {
  const [flipBoxEnabled, enableFlipBox] = useState(!!sessionStorage.getItem('subscribed'));

  const subscribeToNwsl = (e) => {
    e.preventDefault();
    sessionStorage.setItem('subscribed', true);
    enableFlipBox(true);
  };

  const unsubscribe = () => {
    sessionStorage.removeItem('subscribed');
    enableFlipBox(false);
  };

  return (
    <section className="subscription-field flip-box-user">
      <form>
        <div className={'flip-box-inner' + (flipBoxEnabled ? ' flip-box-animated' : '')}>
          <div className="flip-box-front">
            <fieldset>
              <legend className="title">Subscribe to our Newsletter</legend>
              <p>Subscribe to our newsletter and receive new recipes in your inbox.</p>
              <input className="submit-field" type="submit" onClick={subscribeToNwsl} value="Subscribe" />
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
