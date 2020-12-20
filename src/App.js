import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

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

const theme = createMuiTheme({
  direction: 'rtl',
  // typography: { fontFamily: 'AssistantRegular,sans-serif' },
  typography: { fontFamily: 'Marco,sans-serif' },
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App({ setUsageMode, setNotesData }) {
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
            <Route path="*" component={Page404} />
          </CustomAnimatedSwitch>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUsageMode: (usageMode) => dispatch(setUsageMode(usageMode)),
  setNotesData: (notesData) => dispatch(setNotesData(notesData)),
});

export default connect(null, mapDispatchToProps)(App);
