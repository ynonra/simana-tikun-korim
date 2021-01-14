import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsBookmarkLineSelectionMode,
  selectLang,
  // selectNikudMode,
} from '../../redux/tikun/tikun.selectors';
import {
  setSelectedBookmarkLineNum,
  endSelectBookmarkLineMode,
} from '../../redux/tikun/tikun.actions';

import { Element } from 'react-scroll';

import Word from '../word/word.component';
import Button from '@material-ui/core/Button';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import { tikunReadingPageText } from '../../data/lang-dic';
import './line.styles.scss';
import { useLocation } from 'react-router';

const Line = ({
  str,
  isNikudMode,
  holiday,
  specHoliday,
  isScrollView,
  isBookmarkLineSelectionMode,
  isBookmarkLine,
  isBookmark,
  lineNum,
  setSelectedBookmarkLineNum,
  handleOpenBookmarkDialog,
  handleSaveExistingBookmark,
  isFirstScroll,
  lang,
}) => {
  const lineRef = useRef(null);
  const israelQuery = new URLSearchParams(useLocation().search).get('israel');
  const israelOrAbroad =
    israelQuery === 'true'
      ? 'israel'
      : israelQuery === 'false'
      ? 'abroad'
      : undefined;
  const holidayAliyotDivision =
    holidaysHebEnDic?.[holiday]?.subHolidays?.[israelOrAbroad]?.[specHoliday]
      ?.aliyotDivision;

  let lineMode = '';
  const isClosenParasha = str.includes('{ס}');
  if (str.includes('{פ}')) lineMode += ' open-parasha';
  if (str.includes('{ש}')) lineMode += ' space-line';

  const className = str.match(/{[ספ]}/) ? 'word-padding' : '';

  const holidayRegex = specHoliday
    ? holidayAliyotDivision
      ? new RegExp(`{${holidayAliyotDivision}-.+?}`)
      : new RegExp(
          `{חג-${israelOrAbroad === 'abroad' ? 'חו"ל-' : ''}${
            holiday
              ? israelOrAbroad
                ? holidaysHebEnDic[holiday].subHolidays[israelOrAbroad][
                    specHoliday
                  ].he
                : holidaysHebEnDic[holiday].subHolidays[specHoliday].he
              : holidaysHebEnDic[specHoliday].he
          }-.+?}`,
          'g'
        )
    : null;
  const aliyotSigns = !specHoliday
    ? str.match(
        /({שנ.+?}|{שליש.+?}|{רביע.+?}|{חמיש.+?}|{שיש.+?}|{שביע.+?}|{מפטי.+?}|{במחוברות.+?}|\[.+?\])/g
      )
    : str.match(holidayRegex);

  const ChooseBookmarkNoteElem = (
    <div
      className="choose-bookmark-note-container"
      onClick={() => {
        setSelectedBookmarkLineNum(lineNum);
        if (isBookmark) {
          handleSaveExistingBookmark(lineNum);
        } else {
          handleOpenBookmarkDialog();
        }
      }}
    >
      <Button variant="contained" color="primary" className="bookmark-line-btn">
        {tikunReadingPageText.chooseLineForBookmarkBtn[lang]}
      </Button>
    </div>
  );

  function matchWords(str) {
    return str
      .replace(
        /({[פש]}|{שנ.+?}|{שליש.+?}|{רביע.+?}|{חמיש.+?}|{שיש.+?}|{שביע.+?}|{מפטי.+?}|{במחוברות.+?}|\[.+?\])/g,
        ''
      )
      .replace(/\{חג-.+?\}/g, '')
      .replace(/♢/g, specHoliday ? '' : '$&')
      .match(/[^\s\w<>="'׃]+[׃־]?/g);
  }
  return (
    <Element
      name={'line-index-' + lineNum}
      className={`line${lineMode} ${
        isScrollView && aliyotSigns
          ? aliyotSigns.find((s) => s.includes('['))
            ? 'scroll-view-markered-line-parasha'
            : 'scroll-view-markered-line-aliya'
          : ''
      } ${isBookmarkLineSelectionMode ? 'is-bookmark-mode' : ''} ${
        isBookmarkLine && isScrollView
          ? 'is-scroll-view-bookmark-line'
          : isBookmarkLine && isFirstScroll
          ? 'text-glow'
          : ''
      }`}
      ref={lineRef}
    >
      {isBookmarkLineSelectionMode && !isScrollView
        ? ChooseBookmarkNoteElem
        : null}
      {aliyotSigns && !isScrollView && isNikudMode
        ? aliyotSigns.map((aliyaSign) => {
            let aliyaName = aliyaSign.replace(/[{}[\]]/g, '');
            if (specHoliday) aliyaName = aliyaName.split('-').pop();

            return (
              <Element
                name={aliyaName}
                key={aliyaName}
                className={`aliya-sign ${
                  aliyaName.length > 18 && isNikudMode ? 'arrow' : ''
                }`}
              >
                {isNikudMode ? aliyaName : ''}
              </Element>
            );
          })
        : null}
      {isClosenParasha
        ? str.split('{ס}').map((linePart) => (
            <div key={Math.random()}>
              {matchWords(linePart).map((wordText) => (
                <Word
                  className={className}
                  str={wordText}
                  key={Math.random()}
                />
              ))}
            </div>
          ))
        : matchWords(str).map((wordText) => (
            <Word className={className} str={wordText} key={Math.random()} />
          ))}
    </Element>
  );
};

const mapStateToProps = createStructuredSelector({
  isBookmarkLineSelectionMode: selectIsBookmarkLineSelectionMode,
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedBookmarkLineNum: (lineNum) =>
    dispatch(setSelectedBookmarkLineNum(lineNum)),
  endSelectBookmarkLineMode: () => dispatch(endSelectBookmarkLineMode),
});

export default connect(mapStateToProps, mapDispatchToProps)(Line);
