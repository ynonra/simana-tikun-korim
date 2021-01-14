import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';
import TikunSpecHolidayPage from '../TikunSpecHolidayPage/TikunSpecHolidayPage.component';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import { tikunHolidaysPageText } from '../../data/lang-dic';
import './TikunHolidaysPage.styles.scss';

const TikunHolidaysPage = ({ lang }) => {
  const match = useRouteMatch();

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="holidays-page page default-background">
          <AppBar title={tikunHolidaysPageText.appBarTitle[lang]} />
          <NavButtonsContainer
            buttonsData={Object.entries(holidaysHebEnDic).map(
              ([holidayEn, holidayObj]) => {
                return {
                  title: holidayObj[lang],
                  url: holidayEn,
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

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(TikunHolidaysPage);
