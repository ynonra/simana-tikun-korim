import React from 'react';

import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';

import LogoUrl from '../../assets/icons/logo.svg';
import './HomePage.styles.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="page">
        <div className="logo-container">
          <img src={LogoUrl} alt="simana-logo" className="logo" />
        </div>
        <NavButtonsContainer
          className="display-flex direction-column"
          withScaleAnimation
          gradientBorder
          buttonsData={[
            { title: 'התחל', url: '/home-nav', style: { width: 80 } },
            {
              title: 'אודות',
              url: '/about',
              style: { width: 80 },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
