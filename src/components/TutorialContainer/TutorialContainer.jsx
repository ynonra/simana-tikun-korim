import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  selectIsToraPageReady,
  selectLang,
} from '../../redux/tikun/tikun.selectors';

import TutorialModal from '../tutorialModal/tutorialModal';

import { isMobile } from 'react-device-detect';

import { disableScrolling, enableScrolling } from '../../util/scrolling';

import { tutorialsText } from '../../data/lang-dic';
import './TutorialContainer.scss';

const TutorialContainer = ({ isToraPageReady, lang }) => {
  const [open, setOpen] = useState(true);
  const [currentModalDisplayData, setCurrentModalDisplayData] = useState({
    index: 0,
    displayMode: 'first-fade-in',
  });

  useEffect(() => {
    if (open) {
      disableScrolling();
    } else {
      enableScrolling();
    }
  }, [open]);

  const modalsData = [
    {
      description: tutorialsText.changeNikud.description[lang],
      actionType: 'tap',
    },
    {
      description: tutorialsText.movePage.description[lang],
      actionType: 'swipe-left-right',
    },
    {
      description: tutorialsText.listenToTaamInWord.description[lang],
      actionType: 'long-press',
    },
    {
      description: tutorialsText.openSidebarMenu.description[lang],
      actionType: 'swipe-left',
    },
  ];

  return open && isToraPageReady ? (
    <TutorialModal
      key={Math.random()}
      setTutorialsOpen={setOpen}
      description={
        modalsData[currentModalDisplayData.index].description[
          isMobile ? 'mobile' : 'pc'
        ]
      }
      actionType={modalsData[currentModalDisplayData.index].actionType}
      displayMode={currentModalDisplayData.displayMode}
      userAction={currentModalDisplayData.userAction}
      setCurrentModalDisplayData={setCurrentModalDisplayData}
      currentModalDisplayData={currentModalDisplayData}
    />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  isToraPageReady: selectIsToraPageReady,
  lang: selectLang,
});

export default connect(mapStateToProps)(TutorialContainer);
