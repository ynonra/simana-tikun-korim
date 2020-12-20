import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setWordTaamMenuData } from '../../redux/tikun/tikun.actions';

import { findTaamInWord } from '../../util/teamim-parse';

import './word.styles.scss';

const Word = ({ str, className, setTaamMenuData }) => {
  const [touchTimeout, setTouchTimeout] = useState(undefined);

  const isSpecialLetter = str.match(/{[גק]-?.+?}/);
  const specialSizeData =
    isSpecialLetter && isSpecialLetter[0].replace(/[-{}]/g, '');
  const specialSize = isSpecialLetter ? specialSizeData[0] : undefined;
  const specialLetter = isSpecialLetter ? specialSizeData.slice(1) : undefined;
  const lettersBeforeSpecialLetter = str.replace(/{.+/, '');
  const lettersAfterSpecialLetter = str.replace(/.+}/, '');
  const isInvertedNun = str === '׆';

  function calcTaamName(wordElement) {
    const wordStr = parseStrFromHtml(wordElement.textContent);
    const nextWords = getSiblingWords(wordElement, 'next');
    const previousWords = getSiblingWords(wordElement, 'prev');
    const taamData = findTaamInWord(wordStr, previousWords, nextWords);

    const { nextTaamWordsCount, prevTaamWordsCount } = taamData || {};
    const allWordsString = [
      ...previousWords.slice(0, prevTaamWordsCount || 0).reverse(),
      wordStr,
      ...nextWords.slice(0, nextTaamWordsCount || 0),
    ].join(' ');
    return { taamData, wordStr: allWordsString };
  }

  function showTaamMenu(taamData, wordStr) {
    setTaamMenuData({ taamData: taamData, wordStr: wordStr });
  }

  function getSiblingWords(currentWordElem, siblingDirection) {
    const allWordsElems = Array.from(document.querySelectorAll('.word'));
    const currentWordIndex = allWordsElems.findIndex(
      (elem) => elem === currentWordElem
    );
    const startIndex =
      siblingDirection === 'next' ? currentWordIndex + 1 : currentWordIndex - 4;
    const endIndex =
      siblingDirection === 'next' ? currentWordIndex + 5 : currentWordIndex;
    const siblingwords = allWordsElems
      .slice(startIndex, endIndex)
      .map((wordElem) => parseStrFromHtml(wordElem.textContent))
      .filter((wordStr) => wordStr !== '♢');
    return siblingDirection === 'next' ? siblingwords : siblingwords.reverse();
  }

  function parseStrFromHtml(html) {
    return html.replace(/<.+?>/g, '');
  }

  function onLongTouch(onTouchStartEvent, callback) {
    const { taamData, wordStr } = calcTaamName(onTouchStartEvent.target);
    setTouchTimeout(setTimeout(() => callback(taamData, wordStr), 600));
  }

  const touchEndHandlers = {
    onMouseUp: setTouchEnd,
    onMouseLeave: setTouchEnd,
    onMouseOut: setTouchEnd,
    onTouchEnd: setTouchEnd,
    onTouchMove: setTouchEnd,
  };

  function onTouchStartHandler(ev) {
    onLongTouch(ev, showTaamMenu);
  }

  function setTouchEnd() {
    clearTimeout(touchTimeout);
    setTouchTimeout(undefined);
  }

  function onMouseRightClickHandler(ev) {
    ev.preventDefault();

    const { taamData, wordStr } = calcTaamName(ev.target);
    showTaamMenu(taamData, wordStr);
  }

  return (
    <span
      className={`word ${str[str.length - 1] !== '־' ? className : ''} ${
        isInvertedNun ? 'inverted-nun' : ''
      }`}
      // ref={wordRef}
      // data-long-press-delay="400"
      onTouchStart={onTouchStartHandler}
      onContextMenu={onMouseRightClickHandler}
      {...touchEndHandlers}
    >
      {specialSizeData ? (
        <span>
          {lettersBeforeSpecialLetter}
          <span className={{ ג: 'big-letter', ק: 'small-letter' }[specialSize]}>
            {specialLetter}
          </span>
          {lettersAfterSpecialLetter}
        </span>
      ) : (
        str
      )}
    </span>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setTaamMenuData: (taamMenuData) =>
    dispatch(setWordTaamMenuData(taamMenuData)),
});

export default connect(null, mapDispatchToProps)(Word);
