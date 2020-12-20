import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectIsToraPageReady } from '../../redux/tikun/tikun.selectors';

import TutorialModal from '../tutorialModal/tutorialModal';

import { isMobile } from 'react-device-detect';

import { disableScrolling, enableScrolling } from '../../util/scrolling';

import './TutorialContainer.scss';

const TutorialContainer = ({ isToraPageReady }) => {
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
      description: {
        mobile: 'לחץ על הכיתוב כדי להעלים או להראות את הניקוד!',
        pc: 'הקש  Enter  או לחץ על הכיתוב כדי להעלים / להראות את הניקוד!',
      },
      actionType: 'tap',
    },
    {
      description: {
        mobile: 'החלק את המסך ימינה / שמאלה כדי לעבור עמוד!',
        pc: 'הקש ⇨ / ⇦, או החלק את המסך ימינה / שמאלה כדי לעבור עמוד!',
      },
      actionType: 'swipe-left-right',
    },
    {
      description: {
        mobile: 'לחץ לחיצה ארוכה על המילה ולמד את ניגון הטעם שלה!',
        pc: 'לחץ על המילה באמצעות הכפתור הימני בעכבר ולמד את ניגון הטעם שלה!',
      },
      actionType: 'long-press',
    },
    {
      description: {
        mobile:
          'לחץ כאן, או החלק את המסך מצד ימין, וגלה עוד אפשרויות שימושיות!',
        pc: 'לחץ כאן וגלה עוד אפשרויות שימושיות!',
      },
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
});

export default connect(mapStateToProps)(TutorialContainer);
