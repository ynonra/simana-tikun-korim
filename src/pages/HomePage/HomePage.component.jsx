import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLang } from '../../redux/tikun/tikun.selectors';

import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';

import { homePageText } from '../../data/lang-dic';

import LogoUrl from '../../assets/icons/logo.svg';
import './HomePage.styles.scss';

const HomePage = ({ lang }) => {
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
            {
              title: homePageText.startBtn[lang],
              url: '/home-nav',
              style: { width: 80 },
            },
            {
              title: homePageText.aboutBtn[lang],
              url: '/about',
              style: { width: 80 },
            },
          ]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(HomePage);
