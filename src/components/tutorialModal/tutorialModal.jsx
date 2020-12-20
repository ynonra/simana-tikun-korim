import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  setNextPage,
  setPrevPage,
  setUsageMode,
  // toggleNikudMode,
} from '../../redux/tikun/tikun.actions';
import {
  selectSideNavOpen,
  selectIsToraPageReady,
} from '../../redux/tikun/tikun.selectors';

import Word from '../word/word.component';
import { Button } from '@material-ui/core';
import { Swipeable } from 'react-swipeable';

import { set } from 'idb-keyval';

import { isMobile } from 'react-device-detect';

import { toggleNikudMode } from '../../util/parse-humash-text';

import './tutorialModal.scss';
import { enableScrolling } from '../../util/scrolling';

const TutorialModal = ({
  setTutorialsOpen,
  description,
  actionType,
  displayMode,
  userAction,
  setCurrentModalDisplayData,
  currentModalDisplayData,
  // toggleNikudMode,
  setNextPage,
  setPrevPage,
  sideNavOpen,
  setUsageMode,
  // isToraPageReady,
}) => {
  const modalRef = useRef(null);
  const modalDescriptionRef = useRef(null);

  useEffect(() => {
    if (!modalRef || !modalRef.current) return;

    // setLongPressModalUIForPc();
    setSwipeLeftModalUI();

    modalRef.current.addEventListener('animationend', () => {
      if (currentModalDisplayData.finish) {
        finishTutorialHandler();
        return;
      }
      modalRef.current.focus();
      if (!userAction) return;

      switch (userAction) {
        case 'tap':
          toggleNikudMode();
          break;
        case 'swipe-left':
          setPrevPage();
          break;
        case 'swipe-right':
          setNextPage();
          break;
        default:
          break;
        // case 'long-press':
        //   setNextPage();
        //   break;
      }
      setCurrentModalDisplayData({
        index: currentModalDisplayData.index,
        displayMode: 'none',
        userAction: null,
      });
      continueToTheNextModal();
    });
    return clearSwipeLeftModalUI;
  }, []);

  useEffect(() => {
    if (
      actionType === 'swipe-left' &&
      sideNavOpen &&
      !currentModalDisplayData.finish
    )
      setCurrentModalDisplayData({
        index: currentModalDisplayData.index,
        displayMode: 'fade-out',
        userAction: null,
        finish: true,
      });
  }, [sideNavOpen]);

  function onClickHandler() {
    if (
      (actionType !== 'tap' && actionType !== 'long-press') ||
      !isModalReady()
    )
      return;
    setCurrentModalDisplayData({
      index: currentModalDisplayData.index,
      displayMode: 'fade-out',
      userAction: actionType,
    });
  }

  function onSwipedHandler({ dir }) {
    if (
      actionType !== 'swipe-left-right' ||
      !isModalReady() ||
      (dir !== 'Right' && dir !== 'Left')
    )
      return;

    let settingsBtn = document.querySelector('.settings-icon');
    settingsBtn.style.zIndex = '';

    setCurrentModalDisplayData({
      index: currentModalDisplayData.index,
      displayMode: 'fade-out',
      userAction: `swipe-${dir.toLowerCase()}`,
    });
  }

  function onKeyDownHandler({ key }) {
    if (!isModalReady()) return;

    switch (actionType) {
      case 'tap':
        if (key === 'Enter') {
          setCurrentModalDisplayData({
            index: currentModalDisplayData.index,
            displayMode: 'fade-out',
            userAction: 'tap',
          });
        }
        break;
      case 'swipe-left-right':
        let userAction;
        if (key === 'ArrowRight') {
          userAction = 'swipe-right';
        } else if (key === 'ArrowLeft') {
          userAction = 'swipe-left';
        } else return;
        setCurrentModalDisplayData({
          index: currentModalDisplayData.index,
          displayMode: 'fade-out',
          userAction: userAction,
        });
        break;
      default:
        break;
    }
  }

  function continueToTheNextModal() {
    setTimeout(
      () =>
        setCurrentModalDisplayData({
          index: currentModalDisplayData.index + 1,
          displayMode: 'fade-in',
          userAction: null,
        }),
      500
    );
  }

  function finishTutorialHandler() {
    setTutorialsOpen(false);
    enableScrolling();
    set('usage-mode', 'used');
    setUsageMode('used');
  }

  function isModalReady() {
    return (
      modalRef &&
      modalRef.current &&
      !(getComputedStyle(modalRef.current).opacity < 1)
    );
  }

  function setSwipeLeftModalUI() {
    if (actionType !== 'swipe-left') return;

    document.querySelector('.tora-page').scrollTo(0, 0);
    const docWidth = document.documentElement.clientWidth;
    let settingsBtn = document.querySelector('.settings-icon');
    if (!settingsBtn) return;
    const {
      top: settingsBtnTop,
      left: settingsBtnLeft,
      height: settingsBtnHeight,
    } = settingsBtn.getBoundingClientRect();
    modalDescriptionRef.current.style.top =
      settingsBtnTop + settingsBtnHeight / 2 + 'px';
    modalDescriptionRef.current.style.right =
      docWidth - settingsBtnLeft + 20 + 'px';
    settingsBtn.classList.add('tutorial-model-mode');
  }

  function clearSwipeLeftModalUI() {
    let settingsBtn = document.querySelector('.settings-icon');
    if (!settingsBtn) return;
    settingsBtn.classList.remove('tutorial-model-mode');
  }

  return (
    <Swipeable onSwiped={onSwipedHandler} trackMouse>
      <div
        className={`tutorial-modal ${actionType} ${displayMode} ${
          isMobile ? 'is-mobile' : 'is-pc'
        } ${currentModalDisplayData.displayMode === 'none' ? 'hidden' : ''}`}
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        ref={modalRef}
        tabIndex="0"
      >
        <div className="description noselect" ref={modalDescriptionRef}>
          {description}
        </div>
        <div className={`user-action ${actionType}`}>
          {actionType === 'long-press' ? (
            <div className="long-press-humash-text noselect">
              <Word str="וְעֵ֧ץ" />
              <Word str="עֹֽשֶׂה־פְּרִ֛י" />
            </div>
          ) : null}
          <div className="finger-action"></div>
        </div>
        <Button
          className="skip-tutorial-btn"
          variant="contained"
          color="default"
          size="small"
          onClick={finishTutorialHandler}
        >
          דלג על ההדרכה
        </Button>
      </div>
    </Swipeable>
  );
};

const mapStateToProps = createStructuredSelector({
  sideNavOpen: selectSideNavOpen,
  isToraPageReady: selectIsToraPageReady,
});

const mapDispatchToProps = (dispatch) => ({
  setUsageMode: (usageMode) => dispatch(setUsageMode(usageMode)),
  setNextPage: () => dispatch(setNextPage()),
  setPrevPage: () => dispatch(setPrevPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialModal);
