import { tikunActionTypes } from './tikun.types';

export const setUsageMode = (usageMode) => {
  return {
    type: tikunActionTypes.SET_USAGE_MODE,
    payload: usageMode,
  };
};

// export const toggleNikudMode = () => {
//   return {
//     type: tikunActionTypes.TOGGLE_NIKUD_MODE,
//   };
// };

// export const setNikudMode = (nikudMode) => {
//   return {
//     type: tikunActionTypes.SET_NIKUD_MODE,
//     payload: nikudMode,
//   };
// };

export const setPageNumber = (pageNumber) => {
  // const validPageNumber = validatePageNumber(pageNumber);
  return {
    type: tikunActionTypes.SET_PAGE_NUMBER,
    payload: pageNumber,
  };
};

export const setNextPage = () => {
  return {
    type: tikunActionTypes.SET_NEXT_PAGE,
  };
};

export const setPrevPage = () => {
  return {
    type: tikunActionTypes.SET_PREV_PAGE,
  };
};

export const setStyleMode = (styleName) => {
  return {
    type: tikunActionTypes.SET_STYLE_MODE,
    payload: styleName,
  };
};

export const startSelectBookmarkLineMode = {
  type: tikunActionTypes.START_SELECT_BOOKMARK_LINE,
};

export const endSelectBookmarkLineMode = {
  type: tikunActionTypes.END_SELECT_BOOKMARK_LINE,
};

export const setSelectedBookmarkLineNum = (lineNum) => ({
  type: tikunActionTypes.SET_SELECTED_BOOKMARK_LINE_NUM,
  payload: lineNum,
});

export const setSideNavOpen = (isOpen) => ({
  type: tikunActionTypes.SET_SIDE_NAV_OPEN,
  payload: isOpen,
});

// export const toggleSideNavOpen = () => ({
//   type: tikunActionTypes.TOGGLE_SIDE_NAV,
// });

export const setTeamimType = (teamimType) => ({
  type: tikunActionTypes.SET_TEAMIM_TYPE,
  payload: teamimType,
});

// export const toggleToraPageScreenOrientation = () => ({
//   type: tikunActionTypes.TOGGLE_SCREEN_ORIENTATION,
// });

export const toggleToraPageColumnsCount = () => ({
  type: tikunActionTypes.TOGGLE_TORA_PAGE_COLUMNS_COUNT,
});

export const setToraPageColumnsCount = (columnsCount) => ({
  type: tikunActionTypes.SET_TORA_PAGE_COLUMNS_COUNT,
  payload: columnsCount === 1 || columnsCount === 2 ? columnsCount : 1,
});

export const setIsToraPageReady = (isReady) => ({
  type: tikunActionTypes.SET_IS_TORA_PAGE_READY,
  payload: isReady,
});

export const setWordTaamMenuData = (wordTaamMenuData) => ({
  type: tikunActionTypes.SET_WORD_TAAM_MENU_DATA,
  payload: wordTaamMenuData,
});

export const setNotesData = (notesData) => ({
  type: tikunActionTypes.SET_NOTES_DATA,
  payload: notesData,
});
