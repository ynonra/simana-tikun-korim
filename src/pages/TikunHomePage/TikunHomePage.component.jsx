import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Hebcal from 'hebcal';

import {
  parashotHebEnDic,
  holidaysHebEnDic,
} from '../../data/parashot-by-books-dic';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';
import TikunHolidaysPage from '../TikunHolidaysPage/TikunHolidaysPage.component';
import TikunBookmarksPage from '../TikunBookmarksPage/TikunBookmarksPage.component';

import './TikunHomePage.styles.scss';
import TikunHumashPage from '../TikunHumashPage/TikunHumashPage.component';

const TikunHomePage = ({ match }) => {
  const [holidayObjParashatHashavua, setHolidayObjParashatHashavua] = useState(
    false
  );
  const parashatHashavuaArray = Hebcal.HDate().getParsha();

  let parashatHashavuaHebrew;
  if (!holidayObjParashatHashavua) {
    parashatHashavuaHebrew = parashatHashavuaArray
      .map(
        (parashaEn) =>
          parashotHebEnDic[parashaEn] || getHolidayHebName(parashaEn) || ''
      )
      .join(' ');
  } else parashatHashavuaHebrew = holidayObjParashatHashavua.he;

  function getHolidayHebName(parashaName) {
    const foundHoliday = Object.entries(
      holidaysHebEnDic
    ).find(([holidayEn, holidayObj]) => parashaName.includes(holidayEn));
    if (foundHoliday) {
      const [enHoliday, hebHoliday] = [foundHoliday[0], foundHoliday[1].he];
      setHolidayObjParashatHashavua({ en: enHoliday, he: hebHoliday });
      return hebHoliday;
    } else return undefined;
  }

  return (
    <>
      <CustomAnimatedSwitch>
        <Route path={`${match.path}/bookmarks`}>
          <TikunBookmarksPage />
        </Route>
        <Route path={`${match.path}/parshat-hashavua`}>
          <TikunReadingPage isParashatHashavua />
        </Route>
        <Route path={`${match.path}/holidays`}>
          <TikunHolidaysPage />
        </Route>
        <Route path={`${match.path}/humash`}>
          <TikunHumashPage />
        </Route>
      </CustomAnimatedSwitch>
    </>
  );
};

export default TikunHomePage;
