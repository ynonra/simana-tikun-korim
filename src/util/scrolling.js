import { parashotHebEnDic } from '../data/parashot-by-books-dic';
import pagesDic from '../data/pages-dic';

export async function scrollerHandlers(
  isFirstScroll,
  isBookmark,
  specificLocationObj,
  bookmarkData,
  scrollToAliyaHandler
) {
  if (!isFirstScroll) return;
  if (isBookmark && bookmarkData) {
    const { line: bookmarkLineIndex } = bookmarkData;
    scrollToLineIndex(bookmarkLineIndex);
  } else if (specificLocationObj) {
    scrollToLineIndex(specificLocationObj.lineIndex);
  } else if (!isBookmark) {
    scrollToAliyaHandler();
  }
}

export function createFunctionScrollToAliyaHandler(
  isHoliday,
  holidayHeb,
  parashaName,
  pageNum,
  aliyaNum,
  parashatHashavuaObj
) {
  return () => {
    const aliyaElementName = getAliyaElementName(
      isHoliday,
      holidayHeb,
      parashaName,
      aliyaNum,
      parashatHashavuaObj
    );
    console.log(aliyaElementName);
    if (
      !checkAliyaSignExist(
        isHoliday,
        holidayHeb,
        aliyaElementName,
        pageNum,
        aliyaNum,
        parashaName
      )
    )
      return;
    scrollToElementName(aliyaElementName);
    addTextGlowAnimation(
      document.querySelector(`[name*="${aliyaElementName}"]`)
    );
  };
}

function scrollToLineIndex(lineIndex) {
  const lineElementName = 'line-index-' + lineIndex;
  if (!document.querySelector(`[name="${lineElementName}"]`)) return;
  scrollToElementName(lineElementName);
}

function getAliyaElementName(
  isHoliday,
  holidayHeb,
  parashaName,
  aliyaNum,
  parashatHashavuaObj
) {
  const isMegillatEsther = holidayHeb === 'מגילת אסתר';
  if (isHoliday && !isMegillatEsther)
    return getFirstHolidayAliyaName(holidayHeb);

  let aliyaElementName = !isMegillatEsther
    ? [
        parashotHebEnDic[parashaName],
        'שני',
        'שלישי',
        'רביעי',
        'חמישי',
        'שישי',
        'שביעי',
      ][aliyaNum - 1]
    : `פרק ${
        ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'][aliyaNum - 1]
      }׳`;
  if (
    parashatHashavuaObj &&
    parashatHashavuaObj.isConnectedParasha &&
    aliyaNum != 1
  ) {
    aliyaElementName = 'מחוברות ' + aliyaElementName;
  }
  if (aliyaNum == 1 && !isMegillatEsther) {
    aliyaElementName = aliyaElementName.split(' ')[0];
  }
  const aliyaSignElement = document.querySelector(
    `[name*="${aliyaElementName}"]`
  );
  const aliyaSignElementName =
    aliyaSignElement && aliyaSignElement.getAttribute('name');
  return aliyaSignElementName;
}

function getFirstHolidayAliyaName(holidayHeb) {
  return holidayHeb.includes('מפטיר')
    ? 'מפטיר'
    : holidayHeb === 'חנוכה'
    ? 'נר ראשון'
    : holidayHeb.includes('וזאת הברכה')
    ? 'וזאת הברכה'
    : holidayHeb === 'שמחת תורה, בראשית' || holidayHeb === 'שמיני עצרת, בראשית'
    ? 'חתן בראשית'
    : holidayHeb.match('^[בגדהוז]. סוכות')
    ? 'ראשון עד רביעי'
    : holidayHeb.includes('פרשת ')
    ? holidayHeb
    : 'ראשון';
}

function checkAliyaSignExist(
  isHoliday,
  holidayHeb,
  aliyaElementName,
  pageNum,
  aliyaNum,
  parashaName
) {
  const isMegillatEsther = holidayHeb === 'מגילת אסתר';
  const correctAliyaOrPerekPageNum = isMegillatEsther
    ? pagesDic['מגילת אסתר']['perek_' + aliyaNum]
    : !isHoliday
    ? pagesDic[parashotHebEnDic[parashaName]]['aliya_' + aliyaNum]
    : null;
  return (
    ((!isHoliday || isMegillatEsther) &&
      aliyaElementName &&
      pageNum === correctAliyaOrPerekPageNum) ||
    (isHoliday &&
      document.querySelector(
        `[name^="${getFirstHolidayAliyaName(holidayHeb)}"]`
      ))
  );
}

function scrollToElementName(aliyaElementName) {
  const appBarElem = document.querySelector('.app-bar');
  const toraPage = document.querySelector('.tora-page');
  const isAppBarFixed = toraPage.classList.contains('app-bar-fixed');
  const lineElem = document.querySelector(
    `.humash-text [name^="${aliyaElementName}"]`
  );
  console.log(aliyaElementName);
  console.log(lineElem);

  const {
    top: lineDisFromTop,
    height: lineHeight,
  } = lineElem.getBoundingClientRect();
  const { height: AppBarHeight } = appBarElem.getBoundingClientRect();
  const scrollTopDistance =
    lineDisFromTop - (isAppBarFixed ? AppBarHeight : 0) - lineHeight * 0.8;

  toraPage.scrollBy({
    behavior: 'smooth',
    block: 'start',
    left: 0,
    top: scrollTopDistance,
  });
}

function addTextGlowAnimation(element) {
  element.classList.add('text-glow');
  element.style.animation = 'text-shadow-fade-out 5s 3s forwards';
}

export function disableScrolling(elem) {
  if (elem) {
    elem.classList.add('scroll-lock');
  } else {
    let pageElements = document.querySelectorAll('.page');
    for (let pageElem of pageElements) {
      pageElem.classList.add('scroll-lock');
    }
  }
}

export function enableScrolling(elem) {
  if (elem) {
    elem.classList.remove('scroll-lock');
  } else {
    let pageElements = document.querySelectorAll('.page');
    for (let pageElem of pageElements) {
      pageElem.classList.remove('scroll-lock');
    }
  }
}
