import React from 'react';

import Line from '../components/line/line.component';

export function createFunctionHumashTextDOMGenerator(
  pageText,
  holiday,
  specHoliday,
  handleOpenBookmarkDialog,
  handleSaveExistingBookmark,
  isFirstScroll,
  isBookmark,
  bookmarkData,
  pageNum,
  aliyaNum
) {
  return (nikudMode, isScrollView) => {
    // const isLinesNikudMode = nikudMode === undefined ? isNikudMode : nikudMode;
    const isLinesNikudMode = nikudMode;
    const linesArray = linesArrayGenerator(
      isLinesNikudMode,
      pageText,
      holiday || specHoliday
    );
    let lineIndex = 0;

    return linesArray.map((lineText) => {
      let isBookmarkLine = false;
      if (isBookmark && bookmarkData) {
        const { line: bookmarkLineIndex, page: bookmarkPageNum } = bookmarkData;
        isBookmarkLine =
          +pageNum === +bookmarkPageNum && +bookmarkLineIndex === +lineIndex;
      }

      return (
        <Line
          isNikudMode={isLinesNikudMode}
          holiday={holiday}
          specHoliday={specHoliday}
          isScrollView={isScrollView}
          str={lineText}
          aliyaNum={aliyaNum}
          key={Math.random()}
          lineNum={lineIndex++}
          handleOpenBookmarkDialog={handleOpenBookmarkDialog}
          handleSaveExistingBookmark={handleSaveExistingBookmark}
          isBookmarkLine={isBookmarkLine}
          isBookmark={isBookmark}
          isFirstScroll={isFirstScroll}
        />
      );
    });
  };
}

function linesArrayGenerator(nikudMode, pageText, isHoliday) {
  return pageText
    ? parseTextToLinesArray(
        pageText[nikudMode ? 'pageWithNikud' : 'pageWithoutNikud'],
        nikudMode,
        isHoliday
      )
    : '';
}

function parseTextToLinesArray(text, isNikudMode, isHoliday) {
  return text
    .replace(/\{שוח\}/g, isNikudMode ? '♢' : '')
    .replace(/\{חג-.+?\}/g, !isHoliday ? '' : '$&')
    .replace(
      /({שנ.+?}|{שליש.+?}|{רביע.+?}|{חמיש.+?}|{שי?ש.+?}|{שביע.+?}|{מפטי.+?}|\[.+?\])/g,
      isHoliday ? '' : '$&'
    )
    .match(/(?<line>[^b]+?)(\{פ\}|<br>|\{ש\}|$)/g)
    .map((lineMatch) => lineMatch.replace('<br>', ''));
}

export function toggleNikudMode() {
  let columnWithNikud = document.querySelector('#column-with-nikud');
  let columnWithoutNikud = document.querySelector('#column-without-nikud');
  columnWithNikud.classList.toggle('hidden');
  columnWithoutNikud.classList.toggle('hidden');
  const isNikudMode = !columnWithNikud.classList.contains('hidden');
  localStorage.setItem('nikudMode', isNikudMode);
}

export function setNikudMode(nikudMode) {
  let columnWithNikud = document.querySelector('#column-with-nikud');
  let columnWithoutNikud = document.querySelector('#column-without-nikud');
  if (nikudMode) {
    columnWithNikud.classList.remove('hidden');
    columnWithoutNikud.classList.add('hidden');
  } else {
    columnWithNikud.classList.add('hidden');
    columnWithoutNikud.classList.remove('hidden');
  }
  localStorage.setItem('nikudMode', nikudMode);
}
