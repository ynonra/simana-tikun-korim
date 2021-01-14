import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLang } from '../../redux/tikun/tikun.selectors';
import { setLanguage } from '../../redux/tikun/tikun.actions';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { Language } from '@material-ui/icons';

import './LanguageBtn.scss';

const LanguageBtn = ({ lang, setLanguage }) => {
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const openMenuHandler = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const closeMenuHandler = () => {
    setAnchorElMenu(null);
  };

  const clickSetLanguageHandler = ({ target }) => {
    const { lang } = target.dataset;
    setLanguage(lang);
  };

  return (
    <div className="language-button-container">
      <Button
        variant="contained"
        color="default"
        id="lang-btn"
        className={`lang-${lang}`}
        startIcon={<Language />}
        onClick={openMenuHandler}
      >
        {lang.toUpperCase()}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorElMenu}
        keepMounted
        open={Boolean(anchorElMenu)}
        onClose={closeMenuHandler}
        disableRestoreFocus
      >
        <MenuItem onClick={closeMenuHandler} className="ltr">
          <div
            className="lang-menu-item"
            data-lang="en"
            onClick={clickSetLanguageHandler}
          >
            English
          </div>
        </MenuItem>
        <MenuItem onClick={closeMenuHandler} className="rtl">
          <div
            className="lang-menu-item lang-he"
            data-lang="he"
            onClick={clickSetLanguageHandler}
          >
            עברית
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (language) => dispatch(setLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBtn);
