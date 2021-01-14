import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, useRouteMatch } from 'react-router-dom';

import {
  selectLang,
  selectTeamimType,
} from '../../redux/tikun/tikun.selectors';
import { setTeamimType } from '../../redux/tikun/tikun.actions';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import LearnTeamimPage from '../LearnTeamimPage/LearnTeamimPage';
import ReadingExamplePage from '../ReadingExamplePage/ReadingExamplePage';

import { Tabs, Tab } from '@material-ui/core';

import { learnTeamimHomePage } from '../../data/lang-dic';
import './LearnTeamimHomePage.scss';

const LearnTeamimHomePage = ({ teamimType, setTeamimType, lang }) => {
  const match = useRouteMatch();
  const handleChange = (event, newValue) => {
    setTeamimType(newValue);
  };

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="learn-teamim-home-page page default-background extra-opacity">
          <AppBar title={learnTeamimHomePage.appBarTitle[lang]} />
          <Tabs
            value={teamimType}
            onChange={handleChange}
            textColor="primary"
            centered
          >
            <Tab
              className="tab-jerusalemi"
              value="jerusalemi"
              label={learnTeamimHomePage.jerusalemMinhag[lang]}
            />
            <Tab
              className="tab-ashkenazi"
              value="ashkenazi"
              label={learnTeamimHomePage.ashkenazMinhag[lang]}
            />
            <Tab
              className="tab-marokai"
              value="marokai"
              label={learnTeamimHomePage.marokoMinhag[lang]}
            />
          </Tabs>
          <section className="teamim-type-section">
            <h2>{learnTeamimHomePage.torahTeamimTitle[lang]}</h2>
            <NavButtonsContainer
              className={`display-flex direction-column ${teamimType}`}
              buttonStyle={{ width: '7em' }}
              buttonsData={[
                {
                  title: learnTeamimHomePage.learnTeamimBtn[lang],
                  url: 'humash/teamim',
                },
                {
                  title: learnTeamimHomePage.listenToParshaSample[lang],
                  url: 'humash/read-example',
                },
              ]}
            />
          </section>
          <section className="teamim-type-section">
            <h2>{learnTeamimHomePage.haftaraTeamimTitle[lang]}</h2>
            <NavButtonsContainer
              className={`display-flex direction-column ${teamimType}`}
              buttonStyle={{ width: '7em' }}
              buttonsData={[
                {
                  title: learnTeamimHomePage.learnTeamimBtn[lang],
                  url: 'haftara/teamim',
                },
                {
                  title: learnTeamimHomePage.listenToParshaSample[lang],
                  url: 'haftara/read-example',
                },
              ]}
            />
          </section>
          <Footer />
        </div>
      </Route>
      <Route path={`${match.path}/:bookType/:learningType`}>
        {<RouteHandler />}
      </Route>
    </CustomAnimatedSwitch>
  );
};

const RouteHandler = () => {
  const match = useRouteMatch();
  const { learningType, bookType } = match.params;
  const bookTypeHeb = { humash: 'חומש', haftara: 'הפטרה' }[bookType];
  const bookTypeDic = { en: bookType, he: bookTypeHeb };

  return learningType === 'teamim' ? (
    <LearnTeamimPage bookTypeDic={bookTypeDic} />
  ) : learningType === 'read-example' ? (
    <ReadingExamplePage bookTypeDic={bookTypeDic} />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setTeamimType: (teamimType) => dispatch(setTeamimType(teamimType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnTeamimHomePage);
