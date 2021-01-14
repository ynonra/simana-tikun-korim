import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectSideNavOpen,
  selectStyleMode,
} from '../../redux/tikun/tikun.selectors';
import {
  setSideNavOpen,
  setPageNumber,
  // setNikudMode,
} from '../../redux/tikun/tikun.actions';

import { SwipeableDrawer } from '@material-ui/core';
import TikunNav from '../TikunNav/TikunNav.component';

import { parashotHebEnDic } from '../../data/parashot-by-books-dic';
import pagesDic from '../../data/pages-dic';
import { setNikudMode } from '../../util/parse-humash-text';

import './SwipeableContainerTikunNav.styles.scss';

const SwipeableContainerTikunNav = ({
  styleMode,
  aliyaNum,
  scrollToAliyaHandler,
  setIsFirstScroll,
  setPageNum,
  parashaEnName,
  setAliyaNum,
  isHoliday,
  isBookmark,
  sideNavOpen,
  setSideNavOpen,
  handleClickAddBookmark,
  handleClickSaveBookmark,
  // setNikudMode,
  isLearnMode,
}) => {
  function clickAliyaNum(aliyaNumber) {
    if (aliyaNum === aliyaNumber) {
      scrollToAliyaHandler();
      return;
    }
    setIsFirstScroll(true);
    setPageNum(
      pagesDic[parashotHebEnDic[parashaEnName]]['aliya_' + aliyaNumber]
    );
    setAliyaNum(aliyaNumber);
    setNikudMode(true);
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideNavOpen(open);
  };

  return (
    <SwipeableDrawer
      className={`swipeable-container ${styleMode}`}
      anchor="left"
      open={sideNavOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      minFlingVelocity={250}
      disableRestoreFocus // very important! to prevent scroll to top every time the nav in getting closed
    >
      <TikunNav
        clickAliyaNum={clickAliyaNum}
        isHoliday={isHoliday}
        isBookmark={isBookmark}
        handleClickAddBookmark={handleClickAddBookmark}
        handleClickSaveBookmark={handleClickSaveBookmark}
        isLearnMode={isLearnMode}
      />
    </SwipeableDrawer>
  );
};

const mapStateToProps = createStructuredSelector({
  styleMode: selectStyleMode,
  sideNavOpen: selectSideNavOpen,
});

const mapDispatchToProps = (dispatch) => ({
  setSideNavOpen: (isOpen) => dispatch(setSideNavOpen(isOpen)),
  setPageNum: (pageNum) => dispatch(setPageNumber(pageNum)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeableContainerTikunNav);
