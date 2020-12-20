import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TutorialContainer from '../../components/TutorialContainer/TutorialContainer';
import ToraPage from '../../components/tora-page/tora-page.component';

import {
  selectStyleMode,
  selectUsageMode,
} from '../../redux/tikun/tikun.selectors';

import './TikunReadingPage.styles.scss';

// import { isMobile } from 'react-device-detect';
import {
  // lockLandscape,
  // toggleLandscapeLock,
  unlockOrientation,
} from '../../util/screen';
import { setIsToraPageReady } from '../../redux/tikun/tikun.actions';

// import { ScreenLockLandscape } from '@material-ui/icons';
// import { Fab } from '@material-ui/core';

const TikunReadingPage = ({
  isParashatHashavua,
  isHoliday,
  isBookmark,
  styleMode,
  usageMode,
}) => {
  useEffect(() => {
    return () => {
      unlockOrientation();
    };
  }, []);

  return (
    <div className={`tikun-reading-page-container ${styleMode}`}>
      {usageMode === 'first' ? <TutorialContainer /> : null}
      <ToraPage
        isParashatHashavua={isParashatHashavua}
        isHoliday={isHoliday}
        isBookmark={isBookmark}
        withAppBar
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setIsToraPageReady: (isReady) => dispatch(setIsToraPageReady(isReady)),
});

const mapStateToProps = createStructuredSelector({
  styleMode: selectStyleMode,
  usageMode: selectUsageMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(TikunReadingPage);
