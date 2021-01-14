import React from 'react';

import NavButton from '../NavButton/NavButton.component';

import './NavButtonsContainer.styles.scss';

const NavButtonsContainer = ({
  buttonsData,
  withScaleAnimation,
  inverted,
  className,
  gradientBorder,
  buttonStyle,
}) => {
  let btnIndex = 0;
  return (
    <div className={`nav-buttons-container ${className}`}>
      {buttonsData.map((buttonData) => (
        <NavButton
          scaleAnimation={withScaleAnimation ? { delay: ++btnIndex } : false}
          style={{ ...buttonStyle, ...buttonData.style }}
          key={Math.random()}
          url={buttonData.url}
          title={buttonData.title}
          inverted={inverted}
          gradientBorder={gradientBorder}
        />
      ))}
    </div>
  );
};

export default NavButtonsContainer;
