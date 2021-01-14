import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  selectLang,
  selectTeamimType,
} from '../../redux/tikun/tikun.selectors';
import { setTeamimType } from '../../redux/tikun/tikun.actions';

import { Dialog } from '@material-ui/core';

import { wordTaamMenuText } from '../../data/lang-dic';
import './TaamInWordMenu.scss';

const TaamInWordMenu = ({
  open,
  onClose,
  data,
  teamimType,
  setTeamimType,
  lang,
}) => {
  const [audio, setAudio] = useState(new Audio());
  const params = useParams();
  const bookType = params.bookType || 'humash';
  const sfaradi = data?.taamData?.sfaradi;
  const ashkenazi = data?.taamData?.ashkenazi;

  const audioSrcs = {
    jerusalemi: getAudioSrc('jerusalemi', sfaradi?.en),
    marokai: getAudioSrc('marokai', sfaradi?.en),
    ashkenazi: getAudioSrc('ashkenazi', ashkenazi?.en),
  };
  const cssDirection = lang === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (open) {
      setAudioHandlerAndPlay();
    } else if (!open) {
      stopAudio();
    }
  }, [open]);

  function setAudioHandlerAndPlay(readingTypeEn) {
    setAndLoadAudio(readingTypeEn);
    playAudio(audio);
  }

  function setAndLoadAudio(readingTypeEn) {
    const audioSrc = audioSrcs[readingTypeEn || teamimType];
    audio.src = audioSrc;
    try {
      audio.load();
    } catch (err) {
      console.log('לא נמצא קובץ שמע.');
    }
  }

  function getAudioSrc(readingTypeEn, taamNameEn) {
    if (!readingTypeEn || !taamNameEn) return null;
    try {
      return require(`../../assets/media/${readingTypeEn}/${bookType}/${readingTypeEn}-${taamNameEn}.wav`);
    } catch (err) {
      return null;
    }
  }

  function stopAudio() {
    if (!audio) return;
    audio.pause();
  }

  async function playAudio() {
    if (!audio) return;
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {}
  }

  const TaamRow = ({ readingTypeEn, readingTypeHeb, TaamData }) => {
    function onClickHandler() {
      setAudioHandlerAndPlay(readingTypeEn);
      setTeamimType(readingTypeEn);
    }

    return (
      <div
        className={`taam-row dir-${cssDirection} noselect ${
          readingTypeEn === teamimType ? 'active' : ''
        }`}
        onClick={onClickHandler}
      >
        <div
          className={`reading-type-title dir-${cssDirection} ${readingTypeEn}`}
        >
          {wordTaamMenuText[readingTypeEn][lang]}
        </div>
        <div className="taam-title">{TaamData.he}</div>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="taam-in-word-menu">
        <div className="selected-word noselect">
          {data &&
            (teamimType === 'ashkenazi'
              ? data.ashkenaziSentence
              : data.sfaradiSentence)}
        </div>
        {sfaradi && sfaradi.en !== 'kadma' ? ( // אין מנגינה לקדמא בנוסח ירושלמי
          <TaamRow
            readingTypeEn="jerusalemi"
            readingTypeHeb="ירושלמי"
            TaamData={sfaradi}
          />
        ) : null}
        {ashkenazi ? (
          <TaamRow
            readingTypeEn="ashkenazi"
            readingTypeHeb="אשכנזי"
            TaamData={ashkenazi}
          />
        ) : null}
        {sfaradi ? (
          <TaamRow
            readingTypeEn="marokai"
            readingTypeHeb="מרוקאי"
            TaamData={sfaradi}
          />
        ) : null}
      </div>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setTeamimType: (teamimType) => dispatch(setTeamimType(teamimType)),
});

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
  lang: selectLang,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaamInWordMenu);
