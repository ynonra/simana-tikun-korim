import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLang } from './redux/tikun/tikun.selectors';
import { setNotesData, setUsageMode } from './redux/tikun/tikun.actions';

import ScrollToTop from './components/ScrollToTop/ScrollToTop.component';
import HomePage from './pages/HomePage/HomePage.component';
import TikunHomePage from './pages/TikunHomePage/TikunHomePage.component';
import HomeNavPage from './pages/HomeNavPage/HomeNavPage.component';
import LearnTeamimHomePage from './pages/LearnTeamimHomePage/LearnTeamimHomePage';
import CustomAnimatedSwitch from './components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AboutPage from './pages/AboutPage/AboutPage';
import Page404 from './pages/page404/page404';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import { get } from 'idb-keyval';

import './App.scss';

function App({ setUsageMode, setNotesData, lang }) {
  const isRTL = lang === 'he';
  const theme = createMuiTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    // typography: { fontFamily: 'AssistantRegular,sans-serif' },
    typography: { fontFamily: 'inherit' },
  });
  const jss = create({
    plugins: [...jssPreset().plugins, isRTL ? rtl() : undefined],
  });

  useEffect(() => {
    setCssDirection();

    function setCssDirection() {
      document.body.classList.add(isRTL ? 'rtl' : 'ltr');
      document.body.classList.remove(!isRTL ? 'rtl' : 'ltr');
    }
  }, [lang]);

  useEffect(() => {
    async function checkUsageMode() {
      const keyName = 'usage-mode';
      const usageMode = await get(keyName);
      setUsageMode(usageMode || 'first');
    }

    async function fetchNotesData() {
      try {
        const res = await fetch(`/notes`);
        if (!res) return;
        const notesData = await res.json();
        setNotesData(notesData);
      } catch (err) {}
    }

    checkUsageMode();
    fetchNotesData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <ScrollToTop />
        <div className="App" id="App">
          <CustomAnimatedSwitch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/home-nav" component={HomeNavPage} />
            <Route path="/tikun-korim" component={TikunHomePage} />
            <Route path="/learn-teamim" component={LearnTeamimHomePage} />
            <Route path="/about" component={AboutPage} />
            <Route component={Page404} />
          </CustomAnimatedSwitch>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setUsageMode: (usageMode) => dispatch(setUsageMode(usageMode)),
  setNotesData: (notesData) => dispatch(setNotesData(notesData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
