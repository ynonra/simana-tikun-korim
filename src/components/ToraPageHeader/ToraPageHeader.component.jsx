import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPageNumber } from '../../redux/tikun/tikun.selectors';

import { Settings as SettingsIcon } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { parashotPagesDic } from '../../data/pages-dic';

import './ToraPageHeader.styles.scss';

const ToraPageHeader = ({ pageNum, setSideNavOpen, haftaraData }) => {
  const parashotInPage = haftaraData
    ? [haftaraData.heb]
    : clacParashotInPage(pageNum);

  const parashotNames = parashotInPage.join(' | ');

  function menuIconClickHandler() {
    setSideNavOpen(true);
  }
  return (
    <div className="tora-page-header noselect">
      <div className="menu-button-container">
        <Fab
          aria-label="settings"
          className="settings-icon"
          size="small"
          onClick={menuIconClickHandler}
        >
          <SettingsIcon />
        </Fab>
      </div>
      <div className="titles">
        <h1 className="right-title">{haftaraData ? 'הפטרה' : 'פרשת'}</h1>
        <h1 className="left-title">{parashotNames}</h1>
      </div>
    </div>
  );
};

function clacParashotInPage(pageNum) {
  const parashotInPage = [];
  for (let [parashaName, [startPage, endPage]] of Object.entries(
    parashotPagesDic
  )) {
    if (pageNum >= startPage && pageNum <= endPage)
      parashotInPage.push(parashaName);
    if (pageNum < startPage) return parashotInPage;
  }
  return parashotInPage;
}

const mapStateToProps = createStructuredSelector({
  pageNum: selectPageNumber,
});

export default connect(mapStateToProps)(ToraPageHeader);
