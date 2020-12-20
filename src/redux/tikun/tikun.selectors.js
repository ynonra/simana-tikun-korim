import { createSelector } from 'reselect';

const selectTikun = (state) => state.tikun;

// export const selectNikudMode = createSelector(
//   [selectTikun],
//   (tikun) => tikun.nikudMode
// );

export const selectUsageMode = createSelector(
  [selectTikun],
  (tikun) => tikun.usageMode
);

export const selectPageNumber = createSelector(
  [selectTikun],
  (tikun) => tikun.pageNumber
);

export const selectStyleMode = createSelector(
  [selectTikun],
  (tikun) => tikun.styleMode
);

export const selectIsBookmarkLineSelectionMode = createSelector(
  [selectTikun],
  (tikun) => tikun.isBookmarkLineSelectionMode
);

export const selectSelectedBookmarkLineNum = createSelector(
  [selectTikun],
  (tikun) => tikun.selectedBookmarkLineNum
);

export const selectSideNavOpen = createSelector(
  [selectTikun],
  (tikun) => tikun.sideNavOpen
);

export const selectTeamimType = createSelector(
  [selectTikun],
  (tikun) => tikun.teamimType
);

// export const selectToraPageScreenOrientation = createSelector(
//   [selectTikun],
//   (tikun) => tikun.toraPageScreenOrientation
// );

export const selectToraPageColumnsCount = createSelector(
  [selectTikun],
  (tikun) => tikun.toraPageColumnsCount
);

export const selectIsToraPageReady = createSelector(
  [selectTikun],
  (tikun) => tikun.isToraPageReady
);

export const selectWordTaamMenuData = createSelector(
  [selectTikun],
  (tikun) => tikun.wordTaamMenuData
);

export const selectNotesData = createSelector(
  [selectTikun],
  (tikun) => tikun.notesData
);
