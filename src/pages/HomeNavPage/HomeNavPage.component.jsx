import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import UpdateNotes from '../../components/UpdateNotes/UpdateNotes';

import getParashatHashavuaData from '../../util/get-parashot-and-holidays';

import { homeNavPageText } from '../../data/lang-dic';
import './HomeNavPage.styles.scss';

const HomeNavPage = ({ lang }) => {
  const history = useHistory();

  const { url } = getParashatHashavuaData();

  return (
    <div className="home-nav-page page default-background">
      <AppBar title={homeNavPageText.appBarTitle[lang]} />
      <UpdateNotes noteName="top" />
      <div className="home-nav-buttons-container">
        <button
          className="home-nav-button btn-hover-effect"
          onClick={() => history.push(url)}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/פרשת שבוע.svg')}
            alt="parshat-hashavua"
          />
          <span className="button-title">
            {homeNavPageText.parshatHaShavuaBtn[lang]}
          </span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          onClick={() => history.push('/tikun-korim/humash')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/חומש.svg')}
            alt="chumash"
          />
          <span className="button-title">
            {homeNavPageText.humashBtn[lang]}
          </span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          onClick={() => history.push('/tikun-korim/holidays')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/מועדים.svg')}
            alt="holidays"
          />
          <span className="button-title">
            {homeNavPageText.holidaysBtn[lang]}
          </span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          onClick={() => history.push('/tikun-korim/bookmarks')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/סימניות.svg')}
            alt="bookmarks"
          />
          <span className="button-title">
            {homeNavPageText.bookmarksBtn[lang]}
          </span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          onClick={() => history.push('/learn-teamim')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/לימוד טעמים.svg')}
            alt="learn-teamim"
          />
          <span className="button-title">
            {homeNavPageText.teamimStudyBtn[lang]}
          </span>
        </button>
      </div>
      <UpdateNotes noteName="bottom" />
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(HomeNavPage);
