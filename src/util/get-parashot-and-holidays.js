import Hebcal from 'hebcal';

import {
  parashotHebEnDic,
  holidaysHebEnDic,
} from '../data/parashot-by-books-dic';

export default function getParashatHashavuaData() {
  let holidayObjParashatHashavua = undefined;
  const parashatHashavuaArray = Hebcal.HDate().getParsha();

  let parashatHashavuaHebrew;
  parashatHashavuaHebrew = parashatHashavuaArray
    .map(
      (parashaEn) =>
        parashotHebEnDic[parashaEn] || getHolidayHebName(parashaEn) || ''
    )
    .join(' ');

  function getHolidayHebName(parashaName) {
    if (parashaName.includes('Shmini Atzeret')) {
      holidayObjParashatHashavua = { en: 'Sukkot', heb: 'שמיני עצרת' };
      return 'שמיני עצרת';
    }
    const foundHoliday = Object.entries(
      holidaysHebEnDic
    ).find(([holidayEn, holidayObj]) => parashaName.includes(holidayEn));
    if (foundHoliday) {
      const [enHoliday, hebHoliday] = [foundHoliday[0], foundHoliday[1].heb];
      holidayObjParashatHashavua = { en: enHoliday, heb: hebHoliday };
      return hebHoliday;
    } else return undefined;
  }

  const parshatHashavuaUrl = holidayObjParashatHashavua
    ? `/tikun-korim/holidays/${holidayObjParashatHashavua.en}`
    : '/tikun-korim/parshat-hashavua';
  return { heb: parashatHashavuaHebrew, url: parshatHashavuaUrl };
}

export function getParashaObj(isParashatHashavua, urlParams) {
  let parashatHashavuaObj;

  if (!isParashatHashavua) {
    const { parashaName: parashaNameUrl } = urlParams;
    const isConnectedParasha = [
      'Vayakhel Pekudei',
      'Tazria Metzora',
      'Achrei Mot Kedoshim',
      'Behar Bechukotai',
      'Matot Masei',
      'Nitzavim Vayeilech',
    ].includes(parashaNameUrl);

    parashatHashavuaObj = {
      parashaEnName: parashaNameUrl,
      parashaHebName: parashotHebEnDic[parashaNameUrl],
      isConnectedParasha,
    };
  }

  if (isParashatHashavua) {
    const parashatHashavuaArray = Hebcal.HDate().getParsha('s');
    let parashatHashavuaArrEn = parashatHashavuaArray.filter(
      (parH) => parashotHebEnDic[parH]
    );
    let parashatHashavuaArrHeb = parashatHashavuaArrEn.map(
      (parashaEn) => parashotHebEnDic[parashaEn]
    );
    const isConnectedParasha = parashatHashavuaArrEn.length > 1;
    parashatHashavuaObj = {
      parashaEnName: parashatHashavuaArrEn.join(''),
      parashaHebName: parashatHashavuaArrHeb.join(''),
      isConnectedParasha,
    };
  }

  return parashatHashavuaObj;
}

export function getHolidaysNames(isHoliday, bookmarkData, match) {
  let holiday, specHoliday, holidayHeb;
  if (isHoliday || (bookmarkData && bookmarkData.specHoliday)) {
    holiday = match.params.holiday || (bookmarkData && bookmarkData.holiday);
    specHoliday =
      (bookmarkData && bookmarkData.specHoliday) ||
      match.params.specHoliday ||
      match.url.split('/').pop();
    holidayHeb = holiday
      ? holidaysHebEnDic[holiday || (bookmarkData && bookmarkData.holiday)]
          .subHolidays[
          specHoliday || (bookmarkData && bookmarkData.specHoliday)
        ].heb
      : holidaysHebEnDic[
          specHoliday || (bookmarkData && bookmarkData.specHoliday)
        ].heb;
  }
  return { holiday, specHoliday, holidayHeb };
}
