import { tikunActionTypes } from './tikun.types';
import { validatePageNumber } from './utils';

const INITIAL_STATE = {
  usageMode: 'used',
  pageNumber: undefined,
  styleMode: 'style-regular',
  isBookmarkLineSelectionMode: false,
  selectedBookmarkLineNum: undefined,
  sideNavOpen: false,
  teamimType: 'jerusalemi',
  toraPageColumnsCount: 1,
  isToraPageReady: false,
  wordTaamMenuData: undefined,
  notesData: null,
  lang: /^he/.test(navigator.language) ? 'he' : 'en',
  inIsrael: /^he/.test(navigator.language),
};

const tikunReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tikunActionTypes.SET_USAGE_MODE:
      return { ...state, usageMode: action.payload };
    case tikunActionTypes.SET_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    case tikunActionTypes.SET_NEXT_PAGE:
      return { ...state, pageNumber: validatePageNumber(state.pageNumber + 1) };
    case tikunActionTypes.SET_PREV_PAGE:
      return { ...state, pageNumber: validatePageNumber(state.pageNumber - 1) };
    case tikunActionTypes.SET_STYLE_MODE:
      return { ...state, styleMode: action.payload };
    case tikunActionTypes.START_SELECT_BOOKMARK_LINE:
      return { ...state, isBookmarkLineSelectionMode: true };
    case tikunActionTypes.END_SELECT_BOOKMARK_LINE:
      return { ...state, isBookmarkLineSelectionMode: false };
    case tikunActionTypes.SET_SELECTED_BOOKMARK_LINE_NUM:
      return { ...state, selectedBookmarkLineNum: action.payload };
    case tikunActionTypes.SET_SIDE_NAV_OPEN:
      return { ...state, sideNavOpen: action.payload };
    case tikunActionTypes.SET_TEAMIM_TYPE:
      return { ...state, teamimType: action.payload };
    case tikunActionTypes.TOGGLE_TORA_PAGE_COLUMNS_COUNT:
      return {
        ...state,
        toraPageColumnsCount: state.toraPageColumnsCount === 1 ? 2 : 1,
      };
    case tikunActionTypes.SET_TORA_PAGE_COLUMNS_COUNT:
      return {
        ...state,
        toraPageColumnsCount: action.payload,
      };
    case tikunActionTypes.SET_IS_TORA_PAGE_READY:
      return { ...state, isToraPageReady: action.payload };
    case tikunActionTypes.SET_WORD_TAAM_MENU_DATA:
      return { ...state, wordTaamMenuData: action.payload };
    case tikunActionTypes.SET_NOTES_DATA:
      return { ...state, notesData: action.payload };
    case tikunActionTypes.SET_LANGUAGE:
      return { ...state, lang: action.payload };
    case tikunActionTypes.TOGGLE_IN_ISRAEL:
      return { ...state, inIsrael: !state.inIsrael };
    default:
      return state;
  }
};

export default tikunReducer;
