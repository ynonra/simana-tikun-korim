import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectStyleMode,
  selectToraPageColumnsCount,
} from '../../redux/tikun/tikun.selectors';

import './scrollView.styles.scss';

const ScrollView = ({ HumashPageDOM, columnsCount, styleMode }) => {
  const scrollPositionRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(setScrollingEventListeners, []);

  function updateScrollerPosition() {
    const humashTextElem = document.querySelector('.humash-text');
    const scrollPositionElement = scrollPositionRef.current;
    if (!scrollPositionElement || !humashTextElem) return;

    const { clientHeight } = document.documentElement;
    const { height, top } = humashTextElem.getBoundingClientRect();
    let topPercent = (-top / height) * 100;
    const clientHeightPercent = (clientHeight / height) * 100;
    const bottomPercent = 100 - (topPercent + clientHeightPercent);
    topPercent =
      topPercent > 100
        ? (topPercent = 100)
        : topPercent < 0
        ? (topPercent = 0)
        : topPercent;
    scrollPositionElement.style.top = topPercent + '%';
    scrollPositionElement.style.bottom = bottomPercent + '%';
  }

  useEffect(() => {
    updateScrollerPosition();
  }, [columnsCount]);

  function setScrollingEventListeners() {
    const pageElements = document.querySelectorAll('.page');
    const lastPageElement = pageElements[pageElements.length - 1];
    window.onload = () => {
      updateScrollerPosition();
    };
    window.onresize = () => {
      updateScrollerPosition();
    };
    lastPageElement.onscroll = () => {
      updateScrollerPosition();
    };
  }

  return (
    <div className="scroll-view-fixed-container" ref={scrollViewRef}>
      <div className={'scroll-view ' + styleMode}>
        {HumashPageDOM}
        <div id="scroll-position" ref={scrollPositionRef}></div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  styleMode: selectStyleMode,
  columnsCount: selectToraPageColumnsCount,
});

export default connect(mapStateToProps)(ScrollView);
