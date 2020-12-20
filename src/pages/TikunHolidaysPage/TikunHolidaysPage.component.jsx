import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';
import TikunSpecHolidayPage from '../TikunSpecHolidayPage/TikunSpecHolidayPage.component';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import './TikunHolidaysPage.styles.scss';

const TikunHolidaysPage = () => {
  const match = useRouteMatch();

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="holidays-page page default-background">
          <AppBar title="מועדים" />
          <NavButtonsContainer
            buttonsData={Object.entries(holidaysHebEnDic).map(
              ([holidayEn, holidayObj]) => {
                const url = !holidayObj.subHolidays
                  ? holidayEn
                  : // ? `${holidayEn}/${holidayEn}`
                    holidayEn;
                return {
                  title: holidayObj.heb,
                  url: url,
                };
              }
            )}
          />
          <Footer />
        </div>
      </Route>
      {Object.entries(holidaysHebEnDic)
        .filter(([holidayEn, holidayObj]) => !holidayObj.subHolidays)
        .map(([holidayEn, holidayObj]) => (
          <Route path={`${match.path}/${holidayEn}`} key={Math.random()}>
            <TikunReadingPage isHoliday />
          </Route>
        ))}
      <Route path={`${match.path}/:holiday`}>
        <TikunSpecHolidayPage />
      </Route>
    </CustomAnimatedSwitch>
  );
};

export default TikunHolidaysPage;
