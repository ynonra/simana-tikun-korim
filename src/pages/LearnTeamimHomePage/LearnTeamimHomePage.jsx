import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, useRouteMatch } from 'react-router-dom';

import { selectTeamimType } from '../../redux/tikun/tikun.selectors';
import { setTeamimType } from '../../redux/tikun/tikun.actions';

import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import LearnTeamimPage from '../LearnTeamimPage/LearnTeamimPage';
import ReadingExamplePage from '../ReadingExamplePage/ReadingExamplePage';

import { Tabs, Tab } from '@material-ui/core';

import './LearnTeamimHomePage.scss';

const LearnTeamimHomePage = ({ teamimType, setTeamimType }) => {
  const match = useRouteMatch();
  const handleChange = (event, newValue) => {
    setTeamimType(newValue);
  };

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="learn-teamim-home-page page default-background extra-opacity">
          <AppBar title="לימוד טעמים" />
          <Tabs
            value={teamimType}
            onChange={handleChange}
            textColor="primary"
            centered
          >
            <Tab
              className="tab-jerusalemi"
              value="jerusalemi"
              label="נוסח ירושלמי"
            />
            <Tab
              className="tab-ashkenazi"
              value="ashkenazi"
              label="נוסח אשכנזי"
            />
            <Tab className="tab-marokai" value="marokai" label="נוסח מרוקאי" />
          </Tabs>
          <section className="teamim-type-section">
            <h2>טעמי תורה</h2>
            <NavButtonsContainer
              className={`display-flex direction-column ${teamimType}`}
              buttonsData={[
                { title: 'לימוד טעמים', url: 'humash/teamim' },
                { title: 'קריאת פרשה לדוגמא', url: 'humash/read-example' },
              ]}
            />
          </section>
          <section className="teamim-type-section">
            <h2>טעמי הפטרה</h2>
            <NavButtonsContainer
              className={`display-flex direction-column ${teamimType}`}
              buttonsData={[
                { title: 'לימוד טעמים', url: 'haftara/teamim' },
                { title: 'קריאת פרשה לדוגמא', url: 'haftara/read-example' },
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
  const bookTypeDic = { en: bookType, heb: bookTypeHeb };

  return learningType === 'teamim' ? (
    <LearnTeamimPage bookTypeDic={bookTypeDic} />
  ) : learningType === 'read-example' ? (
    <ReadingExamplePage bookTypeDic={bookTypeDic} />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
});

const mapDispatchToProps = (dispatch) => ({
  setTeamimType: (teamimType) => dispatch(setTeamimType(teamimType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnTeamimHomePage);
