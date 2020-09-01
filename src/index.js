import {Application} from './Application';
import React from 'react';
import ReactDOM from 'react-dom';

(async function () {
  const messageCont = document.querySelector('.msg-container');

  messageCont.addEventListener('click', (e) => {
    if (e.target.classList.contains('closeIcon')) {
      e.target.parentNode.remove();
    }
  });

  window.toaster = {
    addMessage: function (message, type) {
      const div = document.createElement('div');
      div.innerHTML = `<div class="message ${type}">
                                <h3>${message}
                                     <span class="closeIcon"></span>
                                 </h3>
                            </div>`;

      const node = div.firstChild;
      node.style.opacity = 0;

      messageCont.appendChild(node);

      setTimeout(() => {
        node.style.opacity = 1;
      }, 10);

      setTimeout(() => {
        node.style.opacity = 0;
      }, 7000);

      setTimeout(() => {
        node.remove();
      }, 9000);
    },
  };

  ReactDOM.render(<Application />, document.getElementById('app'));

  if (matchMedia) {
    const mq = window.matchMedia('(min-width: 979px)');
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  function WidthChange(mq) {
    const element = document.querySelector('ul.main-navbar-menu');
    const element2 = document.querySelector('div .folded-menu-link');

    if (mq.matches && element && element2) {
      element.classList.remove('menu-open');
      element2.classList.remove('open');
    }
  }
})();
