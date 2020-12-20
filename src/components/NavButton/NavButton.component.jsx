import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavButton.styles.scss';

const NavButton = ({
  title,
  url,
  scaleAnimation,
  style,
  inverted,
  gradientBorder,
}) => {
  const location = useLocation();
  const navButtonRef = useRef(null);
  useEffect(() => {
    if (scaleAnimation)
      navButtonRef.current.style.animationDelay =
        0.3 + scaleAnimation.delay * 0.15 + 's';
  }, [scaleAnimation]);
  const href =
    url[0] === '/'
      ? url
      : `${location.pathname}${
          location.pathname[location.pathname.length - 1] === '/' ? '' : '/'
        }${url}`;
  return (
    <div
      className={`border-container btn-hover-effect ${
        gradientBorder ? 'gradient-border' : ''
      } ${scaleAnimation ? 'scale-animation' : ''}`}
    >
      <Link
        // onClick={() => window.scrollTo(0, 0)}
        className={`nav-button ${inverted ? 'inverted' : ''}`}
        style={style}
        to={href}
        ref={navButtonRef}
      >
        <span className="btn-title">{title}</span>
      </Link>
    </div>
  );
};

export default NavButton;
