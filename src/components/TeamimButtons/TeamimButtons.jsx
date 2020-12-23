import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTeamimType } from '../../redux/tikun/tikun.selectors';

import { Button } from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';

import {
  marokai as marokaiDic,
  jerusalemi as jerusalemiDic,
  ashkenazi as ashkenaziDic,
  allTeamimDic,
} from '../../data/teamim-dic';

import './TeamimButtons.scss';

const TeamimButtons = ({ teamimType, taam, clickTaamHandler }) => {
  const [teamimTypeDic, setTeamimTypeDic] = useState(null);

  const match = useRouteMatch();
  const { bookType } = match.params;

  useEffect(() => {
    const teamimTypeDic = (teamimType === 'ashkenazi'
      ? ashkenaziDic
      : teamimType === 'marokai'
      ? marokaiDic
      : teamimType === 'jerusalemi'
      ? jerusalemiDic
      : null)[bookType];
    const filterTeamimForParser = teamimTypeDic.filter(
      (item) => item.forTeamimButtons !== false
    );
    setTeamimTypeDic(filterTeamimForParser);
  }, [bookType, teamimType]);

  function calcBtnVariant(currentTaamDic, btnTaamDic) {
    return currentTaamDic && btnTaamDic.heb === currentTaamDic.heb
      ? 'contained'
      : 'outlined';
  }

  return (
    <div className="teamim-btns-container">
      <Button
        className={teamimType}
        variant={calcBtnVariant(taam, allTeamimDic)}
        onClick={clickTaamHandler(allTeamimDic)}
        startIcon={<PlayCircleFilled id="play-icon" />}
      >
        {allTeamimDic.heb}
      </Button>
      <div className="flex-break"></div>
      {teamimTypeDic
        ? teamimTypeDic.map((taamDic) => {
            const disabled = !taamDic.en;
            return (
              <Button
                className={teamimType}
                variant={calcBtnVariant(taam, taamDic)}
                disabled={disabled}
                onClick={clickTaamHandler(taamDic)}
                key={Math.random()}
              >
                {taamDic.heb}
              </Button>
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamimType: selectTeamimType,
});

export default connect(mapStateToProps)(TeamimButtons);
