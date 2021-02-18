import React, { useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  setStyleMode,
  startSelectBookmarkLineMode,
  toggleToraPageColumnsCount,
} from '../../redux/tikun/tikun.actions';
import {
  selectLang,
  selectStyleMode,
  selectToraPageColumnsCount,
} from '../../redux/tikun/tikun.selectors';

import InstructionDialog from '../InstructionDialog/InstructionDialog';
import { Button, Divider } from '@material-ui/core';
import {
  Bookmark,
  FormatAlignRight,
  Palette,
  LocalLibrary,
  Save,
  Description,
} from '@material-ui/icons';

import LogoUrl from '../../assets/icons/logo.svg';

import { tikunSideNav } from '../../data/lang-dic';
import './TikunNav.styles.scss';

const TikunNav = ({
  clickAliyaNum,
  toggleColumnsCount,
  columnsCount,
  setStyleMode,
  styleMode,
  isHoliday,
  isBookmark,
  handleClickAddBookmark,
  handleClickSaveBookmark,
  isLearnMode,
  lang,
  isMegillatEsther,
}) => {
  const [instructionOpen, setInstructionOpen] = useState(false);

  function onInstructionClose() {
    setInstructionOpen(false);
  }

  function onInstructionOpen() {
    setInstructionOpen(true);
  }

  const paletteButtonsContainerRef = useRef(null);
  const aliyotButtonsRef = useRef(null);

  const aliyotButtonsHebArr = [
    'א',
    'ב',
    'ג',
    'ד',
    'ה',
    'ו',
    'ז',
    'ח',
    'ט',
    'י',
  ].slice(0, isMegillatEsther ? 10 : 7);

  return (
    <nav className="tikun-side-nav">
      <div className="header">
        <div className="logo-container">
          <img src={LogoUrl} className="logo" alt="simana-logo" />
        </div>
      </div>
      <Divider variant="middle" className="divider" />
      {!isLearnMode ? (
        <Button
          className="nav-button"
          startIcon={<FormatAlignRight />}
          onClick={() => toggleColumnsCount()}
        >
          {columnsCount === 1
            ? tikunSideNav.showTwoCol[lang]
            : tikunSideNav.showOneCol[lang]}
        </Button>
      ) : null}
      <Button
        className="nav-button"
        startIcon={<Palette />}
        onClick={() =>
          paletteButtonsContainerRef.current.classList.toggle('hide')
        }
      >
        {tikunSideNav.changeStyle[lang]}
      </Button>

      <div
        className="palette-buttons-container hide"
        ref={paletteButtonsContainerRef}
      >
        <Button
          className="nav-button style-button klaf"
          onClick={() => setStyleMode('style-tora-paper')}
        >
          {tikunSideNav.changeStyle.options.klaf[lang]}
          <div
            className={`border-bottom ${
              styleMode === 'style-tora-paper' ? 'active' : ''
            }`}
          ></div>
        </Button>
        <Button
          className="nav-button style-button light"
          onClick={() => setStyleMode('style-regular')}
        >
          {tikunSideNav.changeStyle.options.light[lang]}
          <div
            className={`border-bottom ${
              styleMode === 'style-regular' ? 'active' : ''
            }`}
          ></div>
        </Button>
        <Button
          className="nav-button style-button dark"
          onClick={() => setStyleMode('style-dark')}
        >
          {tikunSideNav.changeStyle.options.dark[lang]}
          <div
            className={`border-bottom ${
              styleMode === 'style-dark' ? 'active' : ''
            }`}
          ></div>
        </Button>
      </div>
      {isBookmark ? (
        <Button
          className="nav-button"
          startIcon={<Save />}
          onClick={handleClickSaveBookmark}
        >
          {tikunSideNav.changeCurrentBookmark[lang]}
        </Button>
      ) : !isLearnMode ? (
        <Button
          className="nav-button"
          startIcon={<Bookmark />}
          onClick={handleClickAddBookmark}
        >
          {tikunSideNav.addBookmark[lang]}
        </Button>
      ) : null}
      {(!isHoliday && !isBookmark && !isLearnMode) || isMegillatEsther ? (
        <>
          <Button
            className="nav-button"
            startIcon={<LocalLibrary />}
            onClick={() => aliyotButtonsRef.current.classList.toggle('hide')}
          >
            {
              tikunSideNav[
                isMegillatEsther ? 'scrollToChapter' : 'scrollToAliya'
              ][lang]
            }
          </Button>
          <nav
            className={`aliyot-buttons ${
              isMegillatEsther ? 'is-megillat-esther' : ''
            } hide rtl`}
            ref={aliyotButtonsRef}
          >
            {aliyotButtonsHebArr.map((aliyaName) => {
              const aliyaNum =
                aliyotButtonsHebArr.findIndex((i) => i === aliyaName) + 1;
              return (
                <button
                  key={'aliyaNum' + aliyaNum}
                  className="aliya-button"
                  onClick={() => clickAliyaNum(aliyaNum)}
                >
                  {aliyaName}
                </button>
              );
            })}
          </nav>
        </>
      ) : null}
      {!isLearnMode ? (
        <Button
          className="nav-button"
          startIcon={<Description />}
          onClick={onInstructionOpen}
        >
          {tikunSideNav.instructions[lang]}
        </Button>
      ) : null}
      <InstructionDialog open={instructionOpen} onClose={onInstructionClose} />
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  styleMode: selectStyleMode,
  columnsCount: selectToraPageColumnsCount,
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setStyleMode: (styleMode) => dispatch(setStyleMode(styleMode)),
  startSelectBookmarkLineMode: () => dispatch(startSelectBookmarkLineMode),
  toggleColumnsCount: () => dispatch(toggleToraPageColumnsCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TikunNav);
