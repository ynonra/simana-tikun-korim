import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import UpdateNotes from '../../components/UpdateNotes/UpdateNotes';

import getParashatHashavuaData from '../../util/get-parashot-and-holidays';

import './HomeNavPage.styles.scss';

const HomeNavPage = () => {
  const history = useHistory();

  const { url } = getParashatHashavuaData();

  return (
    <div className="home-nav-page page default-background">
      <AppBar title="תפריט ראשי" />
      <UpdateNotes noteName="top" />
      <div className="home-nav-buttons-container">
        <button
          className="home-nav-button btn-hover-effect"
          // id="parshat-hashavua"
          onClick={() => history.push(url)}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/פרשת שבוע.svg')}
            alt="parshat-hashavua"
          />
          {/* <span className="button-title">{`פרשת השבוע - ${heb}`}</span> */}
          <span className="button-title">פרשת השבוע</span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          // id="humash"
          onClick={() => history.push('/tikun-korim/humash')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/חומש.svg')}
            alt="chumash"
          />
          <span className="button-title">חומש</span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          // id="holidays"
          onClick={() => history.push('/tikun-korim/holidays')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/מועדים.svg')}
            alt="holidays"
          />
          <span className="button-title">מועדים</span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          // id="bookmarks"
          onClick={() => history.push('/tikun-korim/bookmarks')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/סימניות.svg')}
            alt="bookmarks"
          />
          <span className="button-title">סימניות</span>
        </button>
        <button
          className="home-nav-button btn-hover-effect"
          // id="teamim-learning"
          onClick={() => history.push('/learn-teamim')}
        >
          <img
            className="home-nav-btn-icon"
            src={require('../../assets/icons/לימוד טעמים.svg')}
            alt="learn-teamim"
          />
          <span className="button-title">לימוד טעמים</span>
        </button>
      </div>
      <UpdateNotes noteName="bottom" />
      <Footer />
    </div>
  );
};

export default HomeNavPage;
