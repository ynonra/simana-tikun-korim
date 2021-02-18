import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Swipeable } from 'react-swipeable';

import {
  selectIsBookmarkLineSelectionMode,
  selectSelectedBookmarkLineNum,
  selectStyleMode,
  selectPageNumber,
  selectIsToraPageReady,
  selectWordTaamMenuData,
  selectLang,
} from '../../redux/tikun/tikun.selectors';
import {
  endSelectBookmarkLineMode,
  setIsToraPageReady,
  setNextPage,
  setPageNumber,
  setPrevPage,
  setSideNavOpen,
  setWordTaamMenuData,
  startSelectBookmarkLineMode,
} from '../../redux/tikun/tikun.actions';

import AppBar from '../../components/AppBar/AppBar.component';
import ToraPageHeader from '../ToraPageHeader/ToraPageHeader.component';
import ToraPageContent from '../toraPageContent/toraPageContent.component';
import ScrollView from '../scrollView/scrollView.component';
import { scrollToTop } from '../ScrollToTop/ScrollToTop.component';
import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';
import TaamInWordMenu from '../TaamInWordMenu/TaamInWordMenu';

import SwipeableContainerTikunNav from '../SwipeableContainerTikunNav/SwipeableContainerTikunNav.component';
import ModalDialog from '../modalDialog/modalDialog.component';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { set, get } from 'idb-keyval';

import {
  getHolidaysNames,
  getParashaObj,
} from '../../util/get-parashot-and-holidays';
import {
  createFunctionHumashTextDOMGenerator,
  toggleNikudMode,
} from '../../util/parse-humash-text';
import {
  returnTextStyles,
  swipedPageEffect,
  swipingPageEffect,
} from '../../util/swiping-page';
import {
  scrollerHandlers,
  createFunctionScrollToAliyaHandler,
} from '../../util/scrolling';
import { checkOrientation } from '../../util/screen';
import {
  parashotHebEnDic,
  holidaysHebEnDic,
} from '../../data/parashot-by-books-dic';
import pagesDic from '../../data/pages-dic';

import './tora-page.styles.scss';
import { bookmarksPageText, tikunReadingPageText } from '../../data/lang-dic';

const ToraPage = ({
  isParashatHashavua,
  isHoliday,
  isBookmark,
  styleMode,
  endSelectBookmarkLineMode,
  isBookmarkLineSelectionMode,
  selectedBookmarkLineNum,
  startSelectBookmarkLineMode,
  setSideNavOpen,
  setPageNum,
  setNextPage,
  setPrevPage,
  pageNum,
  specificLocationObj,
  withAppBar,
  isLearnMode,
  lockPage,
  haftaraData,
  isToraPageReady,
  setIsToraPageReady,
  wordTaamMenuData,
  setTaamMenuData,
  lang,
}) => {
  // -------------------------- //
  // --- STATES & VARIABLES --- //
  // -------------------------- //

  const [textDoms, setTextDoms] = useState(null);
  const [aliyaNum, setAliyaNum] = useState(1);
  const [isOpenBookmarkDialog, setIsOpenBookmarkDialog] = useState(false);
  const [isOpenSuccessBookmarkNote, setIsOpenSuccessBookmarkNote] = useState(
    false
  );
  const [
    isOpenSuccessSavedExistingBookmarkNote,
    setIsOpenSuccessSavedExistingBookmarkNote,
  ] = useState(false);
  const [openBookmarkInfoNote, setOpenBookmarkInfoNote] = useState(false);

  const [isFirstScroll, setIsFirstScroll] = useState(true);
  const [bookmarkData, setBookmarkData] = useState(null);
  const [isLandscape, setIsLandscape] = useState(checkOrientation('landscape'));
  const toraPageRef = useRef(null);

  let isSwipingPage;

  const match = useRouteMatch();
  const { bookmarkNum } = match.params;
  const israelQuery = new URLSearchParams(useLocation().search).get('israel');
  const israelOrAbroad =
    israelQuery === 'true'
      ? 'israel'
      : israelQuery === 'false'
      ? 'abroad'
      : undefined;
  const { holiday, specHoliday, holidayHeb } = getHolidaysNames(
    isHoliday,
    bookmarkData,
    match,
    israelQuery
  );
  const isMegillatEsther = specHoliday === 'Megillat Esther';

  const parashaObj = getParashaObj(isParashatHashavua, match.params);

  const { parashaEnName, parashaHebName } = parashaObj;

  // console.log('page number: ' + pageNum);

  // ------------------- //
  // --- USE_EFFECTS --- //
  // ------------------- //

  window.onorientationchange = () =>
    setIsLandscape(checkOrientation('landscape'));

  useEffect(() => {
    if (toraPageRef.current) toraPageRef.current.focus();
    if (isBookmarkLineSelectionMode) endSelectBookmarkLineMode();
    if (wordTaamMenuData) setTaamMenuData(null);
    if (isBookmark) {
      const getBookmarkData = async () => {
        const bookmarksData = await get('bookmarks');
        const bookmarkData = bookmarksData[bookmarkNum - 1];
        setBookmarkData(bookmarkData);
        setPageNum(bookmarkData.page);
      };
      getBookmarkData();
    } else {
      const pageNumber =
        (specificLocationObj && specificLocationObj.page) || calcPageNumber();
      setPageNum(pageNumber);
    }
    return () => {
      setTextDoms(null);
      // setNikudMode(true);
      setPageNum(undefined);
      setWordTaamMenuData(null);
    };
  }, [specificLocationObj]);

  useEffect(() => {
    const importText = async () => {
      setIsToraPageReady(false);
      let currentPageWithNikud, currentPageWithoutNikud;
      try {
        let { pageWithNikud, pageWithoutNikud } = await import(
          `../../data/tikun-korim/${
            isMegillatEsther ? 'megilat-ester' : 'pages'
          }/${pageNum}`
        );
        currentPageWithNikud = pageWithNikud;
        currentPageWithoutNikud = pageWithoutNikud;
      } catch (err) {
        if (isMegillatEsther) {
          setPageNum(20);
        } else {
          setPageNum(pageNum - 1);
        }
        return;
      }
      const humashTextDOMGenerator = createFunctionHumashTextDOMGenerator(
        {
          pageWithNikud: currentPageWithNikud,
          pageWithoutNikud: currentPageWithoutNikud,
        },
        holiday,
        specHoliday,
        handleOpenBookmarkDialog,
        handleSaveExistingBookmark,
        isFirstScroll,
        isBookmark,
        bookmarkData,
        pageNum,
        aliyaNum
      );
      setTextDoms({
        domWithNikud: humashTextDOMGenerator(true, false),
        domWithoutNikud: !isLearnMode
          ? humashTextDOMGenerator(false, false)
          : '',
        scrollViewDom: humashTextDOMGenerator(true, true),
      });
      scrollToTop();
      returnTextStyles();
      setIsToraPageReady(true);
    };
    if (!pageNum) return;
    importText();
  }, [pageNum]);

  useEffect(() => {
    setTimeout(
      () =>
        scrollerHandlers(
          isFirstScroll,
          isBookmark,
          specificLocationObj,
          bookmarkData,
          scrollToAliyaHandler
        ),
      50
    );
    // }, [aliyaNum, textDoms]);
  }, [aliyaNum, isToraPageReady]);

  // ------------------ //
  //  --- FUNCTIONS --- //
  // ------------------ //

  function calcPageNumber() {
    return !isBookmark
      ? isHoliday
        ? holiday
          ? israelOrAbroad
            ? holidaysHebEnDic[holiday].subHolidays[israelOrAbroad][specHoliday]
                .page
            : holidaysHebEnDic[holiday].subHolidays[specHoliday].page
          : holidaysHebEnDic[specHoliday].page
        : pagesDic[parashotHebEnDic[parashaEnName]]['aliya_1']
      : undefined;
  }

  const scrollToAliyaHandler = createFunctionScrollToAliyaHandler(
    isHoliday,
    holidayHeb,
    parashaEnName,
    pageNum,
    aliyaNum,
    parashaObj
  );

  function changeToSequentialPageHandler(sequentialDirection) {
    setTextDoms(null);
    if (sequentialDirection === 'next') {
      setNextPage();
    } else if (sequentialDirection === 'prev') setPrevPage();
    setIsFirstScroll(false);
  }

  function handleOpenBookmarkDialog() {
    setIsOpenBookmarkDialog(true);
  }

  function handleCloseBookmarkDialog() {
    setIsOpenBookmarkDialog(false);
    endSelectBookmarkLineMode();
  }

  function handleSuccessNoteClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSuccessBookmarkNote(false);
  }

  function handleSuccessSavedExistingBookmarkNoteClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSuccessSavedExistingBookmarkNote(false);
  }

  function handleClickAddBookmark() {
    setOpenBookmarkInfoNote(true);
    handleStartLineSelectionMode();
    setSideNavOpen(false);
  }

  function handleClickSaveBookmark() {
    setOpenBookmarkInfoNote(true);
    handleStartLineSelectionMode();
    setSideNavOpen(false);
  }

  function handleSaveExistingBookmark(lineNum) {
    saveExistingBookmarkHandler(bookmarkNum - 1, pageNum, lineNum);
    setIsOpenSuccessSavedExistingBookmarkNote(true);
  }

  function handleCloseNote() {
    setOpenBookmarkInfoNote(false);
  }

  function handleStartLineSelectionMode() {
    startSelectBookmarkLineMode();
  }

  function onKeyDownHandler({ key }) {
    if (key === 'ArrowLeft') {
      changeToSequentialPageHandler('next');
    } else if (key === 'ArrowRight') {
      changeToSequentialPageHandler('prev');
    } else if (key === 'Enter') {
      toggleNikudMode();
    } else if ('אtT'.includes(key)) {
      setSideNavOpen(true);
    }
  }

  // -------------- //
  // --- RENDER --- //
  // -------------- //

  return (
    <>
      <div id="page-swiping-gradient"></div>
      <div className="page-swiped-arrows" id="page-swiped-right-arrow">
        <RightArrow />
      </div>
      <div className="page-swiped-arrows" id="page-swiped-left-arrow">
        <RightArrow />
      </div>
      <TaamInWordMenu
        open={Boolean(
          wordTaamMenuData && wordTaamMenuData.taamData && !isMegillatEsther
        )}
        onClose={() => setTaamMenuData(null)}
        data={wordTaamMenuData}
      />
      <div
        className={`tora-page page clear-justify-content ${
          !isLandscape ? 'app-bar-fixed' : ''
        }`}
        ref={toraPageRef}
        onClick={() => {
          if (isBookmarkLineSelectionMode) endSelectBookmarkLineMode();
        }}
        onKeyDown={onKeyDownHandler}
        tabIndex="0"
      >
        {withAppBar ? (
          <AppBar
            isParashatHashavuaTitle={isParashatHashavua}
            isBookmarkTitle={isBookmark}
            calcHolidayTitle={isHoliday}
            withScreenToggleBtn
            position={isLandscape ? 'static' : 'fixed'}
            // setIsLandscape={setIsLandscape}
          />
        ) : null}
        <Swipeable
          trackMouse
          onSwiping={({ absX, deltaX, dir, initial, first }) => {
            if (lockPage) return;

            const windowWidth = window.screen.width;
            if (windowWidth - initial[0] < 40) return;

            if (first && (dir === 'Right' || dir === 'Left'))
              isSwipingPage = true;
            if (isSwipingPage) {
              const dir = deltaX < 0 ? 'Right' : 'Left';
              swipingPageEffect(absX, dir);
            }
          }}
          onSwiped={({ deltaX, initial }) => {
            if (lockPage) return;

            isSwipingPage = false;
            const windowWidth = window.screen.width;
            if (windowWidth - initial[0] < 40) return;
            const pageToChange = swipedPageEffect(deltaX, pageNum);
            if (pageToChange) {
              changeToSequentialPageHandler(pageToChange);
            }
          }}
        >
          <ToraPageHeader
            pageNum={pageNum}
            setSideNavOpen={setSideNavOpen}
            holidayHeb={holidayHeb}
            haftaraData={haftaraData}
            isMegillatEsther={isMegillatEsther}
          />
          <ToraPageContent
            isPageTextReady={Boolean(textDoms)}
            pageNum={pageNum}
            textDoms={
              textDoms
                ? {
                    domWithNikud: textDoms.domWithNikud,
                    domWithoutNikud: textDoms.domWithoutNikud,
                  }
                : null
            }
            setIsFirstScroll={setIsFirstScroll}
            isBookmarkLineSelectionMode={isBookmarkLineSelectionMode}
            isLearnMode={isLearnMode}
            isMegillatEsther={isMegillatEsther}
          />
        </Swipeable>
      </div>
      {textDoms ? <ScrollView HumashPageDOM={textDoms.scrollViewDom} /> : null}
      <SwipeableContainerTikunNav
        styleMode={styleMode}
        aliyaNum={aliyaNum}
        scrollToAliyaHandler={scrollToAliyaHandler}
        setIsFirstScroll={setIsFirstScroll}
        parashaEnName={parashaEnName}
        setAliyaNum={setAliyaNum}
        isHoliday={isHoliday}
        isBookmark={isBookmark}
        handleClickAddBookmark={handleClickAddBookmark}
        handleClickSaveBookmark={handleClickSaveBookmark}
        isLearnMode={isLearnMode}
        isMegillatEsther={isMegillatEsther}
      />
      <ModalDialog
        withInput
        handleClose={handleCloseBookmarkDialog}
        isOpenDialog={isOpenBookmarkDialog}
        label={bookmarksPageText.editBookmarkDialogLabel[lang]}
        getInitialInputValue={() =>
          lang === 'he'
            ? parashaHebName || holidayHeb
            : parashaEnName || holiday || ''
        }
        handleConfirm={(bookmarkName) => {
          addBookmarkHandler(
            pageNum,
            selectedBookmarkLineNum,
            bookmarkName,
            holiday,
            specHoliday
          );
          setIsOpenSuccessBookmarkNote(true);
          endSelectBookmarkLineMode();
        }}
      />
      <Snackbar
        open={openBookmarkInfoNote}
        autoHideDuration={6000}
        onClose={handleCloseNote}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseNote}
          severity="info"
        >
          {tikunReadingPageText.chooseBookmarkLineInfoAlert[lang]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenSuccessBookmarkNote}
        autoHideDuration={4000}
        onClose={handleSuccessNoteClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSuccessNoteClose}
          severity="success"
        >
          {tikunReadingPageText.addBookmarkSuccessAlert[lang]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenSuccessSavedExistingBookmarkNote}
        autoHideDuration={4000}
        onClose={handleSuccessSavedExistingBookmarkNoteClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSuccessSavedExistingBookmarkNoteClose}
          severity="success"
        >
          {tikunReadingPageText.editBookmarkDialogSuccessAlert[lang]}
        </Alert>
      </Snackbar>
    </>
  );
};

async function addBookmarkHandler(
  pageNum,
  lineNum,
  bookmarkName = undefined,
  holiday,
  specHoliday
) {
  const bookmarksIdbKey = 'bookmarks';
  let bookmarks = await get(bookmarksIdbKey);
  if (!bookmarks) bookmarks = [];
  const bookmarkTitle = bookmarkName || 'סימניה מספר ' + (bookmarks.length + 1);
  bookmarks.push({
    page: pageNum,
    line: lineNum,
    title: bookmarkTitle,
    holiday: holiday,
    specHoliday: specHoliday,
  });
  set(bookmarksIdbKey, bookmarks);
}

async function saveExistingBookmarkHandler(bookmarkIndex, pageNum, lineNum) {
  const bookmarksIdbKey = 'bookmarks';
  let bookmarks = await get(bookmarksIdbKey);
  if (!bookmarks) {
    alert('לא נמצאה סימניה');
    return;
  }
  const updatedBookmark = {
    ...bookmarks[bookmarkIndex],
    page: pageNum,
    line: lineNum,
  };
  bookmarks.splice(bookmarkIndex, 1, updatedBookmark);
  set(bookmarksIdbKey, bookmarks);
}

const mapStateToProps = createStructuredSelector({
  styleMode: selectStyleMode,
  isBookmarkLineSelectionMode: selectIsBookmarkLineSelectionMode,
  selectedBookmarkLineNum: selectSelectedBookmarkLineNum,
  pageNum: selectPageNumber,
  isToraPageReady: selectIsToraPageReady,
  wordTaamMenuData: selectWordTaamMenuData,
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  startSelectBookmarkLineMode: () => dispatch(startSelectBookmarkLineMode),
  endSelectBookmarkLineMode: () => dispatch(endSelectBookmarkLineMode),
  setSideNavOpen: (isOpen) => dispatch(setSideNavOpen(isOpen)),
  setPageNum: (pageNum) => dispatch(setPageNumber(pageNum)),
  setNextPage: () => dispatch(setNextPage()),
  setPrevPage: () => dispatch(setPrevPage()),
  setIsToraPageReady: (isReady) => dispatch(setIsToraPageReady(isReady)),
  setTaamMenuData: (taamMenuData) =>
    dispatch(setWordTaamMenuData(taamMenuData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToraPage);
