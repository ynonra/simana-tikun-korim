import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectLang,
  selectPageNumber,
} from '../../redux/tikun/tikun.selectors';

import { Settings as SettingsIcon } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { parashotPagesDic } from '../../data/pages-dic';
import { parashotHebEnDic } from '../../data/parashot-by-books-dic';

import { tikunReadingPageText } from '../../data/lang-dic';
import './ToraPageHeader.styles.scss';

const ToraPageHeader = ({ pageNum, setSideNavOpen, haftaraData, lang }) => {
  const parashotInPage = haftaraData
    ? [haftaraData[lang]]
    : clacParashotInPage(pageNum)[lang];

  const parashotNames = parashotInPage.join(' | ');

  function menuIconClickHandler() {
    setSideNavOpen(true);
  }
  return (
    <div className="tora-page-header noselect rtl">
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
      <div className={`titles lang-${lang}`}>
        <h1 className="right-title">
          {haftaraData
            ? tikunReadingPageText.headerHaftaraTitle[lang]
            : tikunReadingPageText.headerParshaTitle[lang]}
        </h1>
        <h1 className="left-title">{parashotNames}</h1>
      </div>
    </div>
  );
};

function clacParashotInPage(pageNum) {
  const parashotInPage = { he: [], en: [] };
  for (let [parashaName, [startPage, endPage]] of Object.entries(
    parashotPagesDic
  )) {
    if (pageNum >= startPage && pageNum <= endPage) {
      parashotInPage.he.push(parashaName);
      parashotInPage.en.push(parashotHebEnDic[parashaName]);
    }
    if (pageNum < startPage) return parashotInPage;
  }
  return parashotInPage;
}

const mapStateToProps = createStructuredSelector({
  pageNum: selectPageNumber,
  lang: selectLang,
});

export default connect(mapStateToProps)(ToraPageHeader);
