import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectPageNumber,
  selectToraPageColumnsCount,
  selectUsageMode,
} from '../../redux/tikun/tikun.selectors';

import Loader from '../Loader/Loader';
import LoaderForDownloading from '../LoaderForDownloading/LoaderForDownloading';

import { toggleNikudMode } from '../../util/parse-humash-text';

import './toraPageContent.styles.scss';

const ToraPageContent = ({
  isPageTextReady,
  textDoms,
  columnsCount,
  pageNum,
  setIsFirstScroll,
  isBookmarkLineSelectionMode,
  isLearnMode,
  usageMode,
}) => {
  const [nikudMode, setNikudMode] = useState(true);
  const textWithNikud = useRef(null);
  const textWithoutNikud = useRef(null);

  useEffect(() => {
    if (!textWithNikud.current || !textWithoutNikud.current) return;
    if (columnsCount === 2) {
      textWithNikud.current.classList.remove('hidden');
      textWithoutNikud.current.classList.remove('hidden');
    } else {
      textWithNikud.current.classList.remove('hidden');
      textWithoutNikud.current.classList.add('hidden');
    }
  }, [columnsCount]);

  function onClickHandler() {
    toggleNikudMode();
    setNikudMode(JSON.parse(localStorage.getItem('nikudMode')));
  }

  return (
    <div
      className={`humash-text ${
        pageNum === 78 ? 'is-shirat-hayam-mode' : ''
      } noselect rtl`}
    >
      {isPageTextReady ? (
        <div
          className="just-humash-text"
          id={
            columnsCount === 1
              ? 'one-column-container'
              : 'two-columns-container'
          }
          onClick={() => {
            if (isLearnMode) return;
            if (!isBookmarkLineSelectionMode && columnsCount === 1) {
              onClickHandler();
            }
            setIsFirstScroll(false);
          }}
        >
          <div
            id="column-with-nikud"
            ref={textWithNikud}
            className={columnsCount === 1 && !nikudMode ? 'hidden' : ''}
          >
            {textDoms.domWithNikud}
          </div>
          <div
            id="column-without-nikud"
            ref={textWithoutNikud}
            className={columnsCount === 1 && nikudMode ? 'hidden' : ''}
          >
            {textDoms.domWithoutNikud}
          </div>
        </div>
      ) : usageMode === 'first' ? (
        <LoaderForDownloading />
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  pageNum: selectPageNumber,
  columnsCount: selectToraPageColumnsCount,
  usageMode: selectUsageMode,
});

export default connect(mapStateToProps)(ToraPageContent);
