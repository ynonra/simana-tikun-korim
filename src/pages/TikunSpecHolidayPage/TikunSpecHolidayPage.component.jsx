import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import './TikunSpecHolidayPage.styles.scss';

const TikunSpecHolidayPage = () => {
  const match = useRouteMatch();
  const { holiday } = match.params;
  const specHolidayData = holidaysHebEnDic[holiday].subHolidays;

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="spec-holiday-page page default-background">
          <AppBar title={holidaysHebEnDic[holiday].heb} />
          <NavButtonsContainer
            buttonsData={Object.entries(specHolidayData).map(
              ([holidayEn, holidayObj]) => {
                return {
                  title: holidayObj.heb,
                  url: holidayEn,
                };
              }
            )}
          />
          <Footer />
        </div>
      </Route>
      <Route path={`${match.path}/:specHoliday`}>
        <TikunReadingPage isHoliday />
      </Route>
    </CustomAnimatedSwitch>
  );
};

export default TikunSpecHolidayPage;
