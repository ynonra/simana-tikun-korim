import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectLang } from '../../redux/tikun/tikun.selectors';
import { createStructuredSelector } from 'reselect';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import NavButtonsContainer from '../../components/NavButtonsContainer/NavButtonsContainer.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';

import { withStyles } from '@material-ui/core/styles';
import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';
import { FormControlLabel, Switch } from '@material-ui/core';
import { tikunHolidaysPageText } from '../../data/lang-dic';

import './TikunSpecHolidayPage.styles.scss';

const OrangeSwitch = withStyles({
  switchBase: {
    color: '#b3b3b3',
    '&$checked': {
      color: '#f68620',
    },
    '&$checked + $track': {
      backgroundColor: '#f68620',
    },
  },
  checked: {},
  track: {},
})(Switch);

const TikunSpecHolidayPage = ({ lang }) => {
  const [inIsrael, setInIsrael] = useState(lang === 'he');
  const match = useRouteMatch();
  const { holiday } = match.params;
  const isIsraelOrAbroadMatter = ['Sukkot', 'Pesach', 'Shavuot'].includes(
    holiday
  );
  const specHolidayData = !isIsraelOrAbroadMatter
    ? holidaysHebEnDic[holiday].subHolidays
    : holidaysHebEnDic[holiday].subHolidays[inIsrael ? 'israel' : 'abroad'];
  const cssDirection = lang === 'he' ? 'rtl' : 'ltr';

  const toggleInIsraelHandler = ({ target }) => {
    setInIsrael(target.checked);
  };

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="spec-holiday-page page default-background">
          <AppBar title={holidaysHebEnDic[holiday][lang]} />
          {isIsraelOrAbroadMatter && (
            <FormControlLabel
              className={`switch-container ${
                inIsrael ? 'checked' : ''
              } ${cssDirection}`}
              control={
                <OrangeSwitch
                  checked={inIsrael}
                  onChange={toggleInIsraelHandler}
                />
              }
              label={tikunHolidaysPageText.isIsraelSwitch[lang]}
            />
          )}
          <NavButtonsContainer
            buttonsData={Object.entries(specHolidayData).map(
              ([holidayEn, holidayObj]) => {
                return {
                  title: holidayObj[lang],
                  url: `${holidayEn}?${
                    isIsraelOrAbroadMatter ? `israel=${inIsrael}` : ''
                  }`,
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

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(TikunSpecHolidayPage);
