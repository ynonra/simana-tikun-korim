import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTeamimType } from '../../redux/tikun/tikun.selectors';

import AudioPlayer from 'react-h5-audio-player';

import AppBar from '../../components/AppBar/AppBar.component';

import { allTeamimDic } from '../../data/teamim-dic';

import 'react-h5-audio-player/lib/styles.css';
import './LearnTeamimPage.scss';
import TeamimButtons from '../../components/TeamimButtons/TeamimButtons';
import { unlockOrientation } from '../../util/screen';

const LearnTeamimPage = ({ bookTypeDic, teamimType }) => {
  const [soundFileSrc, setSoundFileSrc] = useState(null);
  const [taam, setTaam] = useState(allTeamimDic);
  const [error, setError] = useState(null);

  const playerRef = useRef(null);

  useEffect(() => {
    return () => {
      unlockOrientation();
    };
  }, []);

  useEffect(() => {
    if (!taam) return;
    try {
      const fileSrc = require(`../../assets/media/${teamimType}/${bookTypeDic.en}/${teamimType}-${taam.en}.wav`);
      setSoundFileSrc(fileSrc);
      setError(null);
    } catch (err) {
      setError(err);
    }
  }, [taam, bookTypeDic.en, teamimType]);

  function clickTaamHandler(taamDic) {
    return () => {
      if (taamDic.heb === taam.heb) {
        const audioElem = playerRef.current.audio.current;
        audioElem.currentTime = 0;
        audioElem.play();
      }
      setTaam(taamDic);
    };
  }

  return (
    <div className="learn-teamim-page page default-background extra-opacity">
      <AppBar title={`${bookTypeDic.heb} - לימוד טעמים`} withScreenToggleBtn />
      <TeamimButtons taam={taam} clickTaamHandler={clickTaamHandler} />
      {!error ? (
        <AudioPlayer
          className="audio-player"
          showJumpControls={false}
          // customControlsSection={[]} // --> to remove controll btns.
          autoPlay={true}
          src={soundFileSrc}
          ref={playerRef}
        />
      ) : (
        <h2 style={{ margin: '.2em' }}>הקובץ לא נמצא</h2>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
});

export default connect(mapStateToProps)(LearnTeamimPage);
