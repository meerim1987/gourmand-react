import React, { useEffect, memo } from 'react';


// Eggs loader
const initEggs = (wrapClass) => {
  let selectAll = function (s) {
      return document.querySelectorAll(s);
    },
    allWhites = selectAll(`.${wrapClass} .whiteContainer circle`),
    allYolks = selectAll(`.${wrapClass} .yolkContainer use`),
    tl;

  TweenMax.set('svg', {
    visibility: 'visible',
  });

  TweenMax.set([allWhites, allYolks], {
    transformOrigin: '50% 50%',
  });

  var mainTl = new TimelineMax({ repeat: -1 });

  for (var i = 0; i < 4; i++) {
    TweenMax.set(allYolks[i], {
      svgOrigin: Number(allYolks[i].getAttribute('x')) + 20.5 + ' ' + (Number(allYolks[i].getAttribute('y')) + 20.5),
    });

    tl = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    tl.from(allWhites[i], 1, {
      scaleX: -1,
      ease: Elastic.easeOut.config(0.7, 0.7),
    })
      .from(
        allWhites[i],
        1,
        {
          scale: 0,
          ease: Elastic.easeOut.config(0.16, 0.7),
        },
        '-=1'
      )
      .to(allWhites[i], 1, {
        scale: 0,
        ease: Circ.easeInOut,
      })
      .from(
        allYolks[i],
        0.7,
        {
          scaleX: -1.3,
          //scaleX:0.2,
          ease: Elastic.easeOut.config(0.64, 0.57),
        },
        '-=2'
      )
      .from(
        allYolks[i],
        1,
        {
          //scaleY:0,
          scaleY: 0,
          ease: Elastic.easeOut.config(1.2, 0.77),
        },
        '-=2'
      )
      .to(
        allYolks[i],
        1,
        {
          scale: 0,
          ease: Expo.easeInOut,
        },
        '-=1'
      );

    mainTl.add(tl, i / 2); //.timeScale(3)
  }

  mainTl.seek(100);

  TweenMax.globalTimeScale(1.2);
};

let index = 0;

export const Loader = memo(() => {
  const wrapClass = `egg_${index++}`;

  useEffect(() => {
    initEggs(wrapClass);
  }, []);

  return (
    <div className={`loader-wrap ${wrapClass}`}>
      <div>
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
                result="cm"
              />
              <feBlend />
            </filter>
            <radialGradient
              id="radial-gradient"
              cx="20.5"
              cy="20.32"
              fx="5.9753758345333345"
              fy="4.511207610428622"
              r="23.94"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.43" stopColor="#feb829" />
              <stop offset="0.53" stopColor="#fdb125" />
              <stop offset="0.68" stopColor="#f99d1a" />
              <stop offset="0.85" stopColor="#f47c09" />
              <stop offset="0.92" stopColor="#f16c00" />
            </radialGradient>
            <symbol id="Yolk" data-name="Yolk" viewBox="0 0 41 41">
              <circle cx="20.5" cy="20.5" r="20.5" fill="url(#radial-gradient)" />
              <path
                d="M5.59,18.78A15,15,0,0,1,23.65,5.83"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </symbol>
          </defs>
          <g className="whiteContainer" fill="#ede6e3" filter="url(#goo)">
            <circle cx="280" cy="300" r="41" />
            <circle cx="360" cy="300" r="41" />
            <circle cx="440" cy="300" r="41" />
            <circle cx="520" cy="300" r="41" />
          </g>
          <g className="yolkContainer">
            <use width="41" height="41" xlinkHref="#Yolk" x="260" y="280" />
            <use width="41" height="41" xlinkHref="#Yolk" x="340" y="280" />
            <use width="41" height="41" xlinkHref="#Yolk" x="420" y="280" />
            <use width="41" height="41" xlinkHref="#Yolk" x="500" y="280" />
          </g>
        </svg>
      </div>
    </div>
  );
});
