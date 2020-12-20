import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  selectStyleMode,
  selectTeamimType,
} from '../../redux/tikun/tikun.selectors';

import AudioPlayer from 'react-h5-audio-player';

import AppBar from '../../components/AppBar/AppBar.component';
import ToraPage from '../../components/tora-page/tora-page.component';

import * as audioData from '../../data/readinig-parasha-audio-data';

import '../ReadingExamplePage/ReadingExamplePage.scss';
import './ReadingExamplePage.scss';
import { setToraPageColumnsCount } from '../../redux/tikun/tikun.actions';
import { unlockOrientation } from '../../util/screen';

const ReadingExamplePage = ({
  bookTypeDic,
  teamimType,
  styleMode,
  setColumnsCount,
}) => {
  const [soundFileSrc, setSoundFileSrc] = useState(null);
  const firstPageNum = bookTypeDic.en === 'humash' ? 233 : 'haftara-roni-akara';
  const firstLineIndex = bookTypeDic.en === 'humash' ? 35 : 0;
  const [specificLocationObj, setSpecificLocationObj] = useState({
    page: firstPageNum,
    lineIndex: firstLineIndex,
  });
  const [error, setError] = useState(null);

  const { bookType } = useParams();
  const audioLinesData = audioData[`${teamimType}LinesTimeDic`][bookType];

  useEffect(() => {
    setColumnsCount(1);
    try {
      const file = require(`../../assets/media/${teamimType}/${bookTypeDic.en}/${teamimType}-parasha.wav`);
      setSoundFileSrc(file);
    } catch (err) {
      setError(err);
    }

    return () => {
      unlockOrientation();
    };
  }, []);

  function onlistenHandler({ target: { currentTime } }) {
    const lineIndex = audioLinesData.reduce(
      (acc, { startTime, lineIndex }) =>
        startTime <= currentTime ? lineIndex : acc,
      firstLineIndex
    );

    if (
      bookType === 'humash' &&
      specificLocationObj.page === firstPageNum &&
      currentTime > audioLinesData[7].startTime
    ) {
      setSpecificLocationObj({
        page: specificLocationObj.page + 1,
        lineIndex: lineIndex,
      });
    } else if (
      bookType === 'humash' &&
      specificLocationObj.page !== firstPageNum &&
      currentTime < audioLinesData[7].startTime
    ) {
      setSpecificLocationObj({
        page: firstPageNum,
        lineIndex: lineIndex,
      });
    }
    markLineHandler(lineIndex);
    scrollHandler(lineIndex);
  }

  function markLineHandler(lineIndex) {
    const lineElem = document.querySelector(`[name="line-index-${lineIndex}"]`);
    if (!lineElem) return;
    clearAllLineMarkers();
    lineElem.classList.add('marker');
    // lineElem.classList.add('text-glow');
  }

  function clearAllLineMarkers() {
    const lineElements = document.querySelectorAll(`.line`);
    lineElements.forEach((lineElem) => {
      lineElem.classList.remove('marker');
      // lineElem.classList.remove('text-glow');
    });
  }

  function scrollHandler(lineIndex) {
    const lineElem = document.querySelector(`[name="line-index-${lineIndex}"]`);
    if (lineIndex === firstLineIndex || lineIndex === 0 || !lineElem) return;
    const scrollablePage = document.querySelector('.tora-page');
    const { top, height } = lineElem.getBoundingClientRect();
    const { clientHeight } = document.documentElement;
    // const wantedTop = clientHeight / 2 - height / 2;
    const wantedTop = clientHeight / 2 - height / 2 - height;
    if (top !== wantedTop)
      scrollablePage.scrollBy({ top: top - wantedTop, behavior: 'smooth' });
  }

  return (
    <div
      className={`reading-example-page page clear-justify-content tikun-reading-page-container ${styleMode}`}
    >
      <AppBar title={`האזנה ל${bookTypeDic.heb}`} withScreenToggleBtn />
      <ToraPage
        specificLocationObj={specificLocationObj}
        isLearnMode
        lockPage
        haftaraData={bookTypeDic.en === 'haftara' ? { heb: 'לפרשת נח' } : null}
      />
      {!error ? (
        <AudioPlayer
          className={`audio-player ${styleMode}`}
          // customControlsSection={[]} // --> to remove controll btns.
          autoPlay={true}
          onListen={onlistenHandler}
          src={soundFileSrc}
        />
      ) : (
        <h2>הקובץ לא נמצא</h2>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
  styleMode: selectStyleMode,
});

const mapDispatchToProps = (dispatch) => ({
  setColumnsCount: (columnsCount) =>
    dispatch(setToraPageColumnsCount(columnsCount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingExamplePage);
