import React, { useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setIsToraPageReady } from '../../redux/tikun/tikun.actions';
import { selectLang } from '../../redux/tikun/tikun.selectors';

import {
  ArrowBack,
  ArrowForward,
  Menu as MenuIcon,
  ScreenRotation,
  Share,
} from '@material-ui/icons';
import { Toolbar, IconButton, AppBar, Menu, MenuItem } from '@material-ui/core';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import { toggleOrientationLock } from '../../util/screen';
import { isMobile } from 'react-device-detect';
import { shareHandler } from '../../util/share';

import {
  appBarMenuText,
  sharingText,
  tikunReadingPageText,
} from '../../data/lang-dic';
import './AppBar.styles.scss';

function AppBarComponent({
  title,
  isParashatHashavuaTitle,
  isBookmarkTitle,
  calcHolidayTitle,
  withScreenToggleBtn,
  setIsToraPageReady,
  position,
  setIsLandscape,
  lang,
}) {
  const match = useRouteMatch();
  const { holiday, specHoliday } = match.params;
  const israelQuery = new URLSearchParams(useLocation().search).get('israel');
  const israelOrAbroad =
    israelQuery === 'true'
      ? 'israel'
      : israelQuery === 'false'
      ? 'abroad'
      : undefined;

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElShareList, setAnchorElShareList] = useState(null);
  const history = useHistory();
  const isRTL = lang === 'he';

  const openMenuHandler = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const closeMenuHandler = () => {
    setAnchorElMenu(null);
  };

  const onClickShareHandler = (ev) => {
    shareHandler(() => openShareListHandler(ev), lang);
  };

  const openShareListHandler = (event) => {
    setAnchorElShareList(event.currentTarget);
  };

  const closeShareListHandler = () => {
    setAnchorElShareList(null);
  };

  const appBarTitle = title
    ? title
    : isParashatHashavuaTitle
    ? tikunReadingPageText.appBarTitle.parshatHaShavua[lang]
    : isBookmarkTitle
    ? tikunReadingPageText.appBarTitle.bookmark[lang]
    : calcHolidayTitle
    ? (holiday && israelOrAbroad
        ? holidaysHebEnDic[holiday].subHolidays[israelOrAbroad][specHoliday][
            lang
          ]
        : holiday &&
          holidaysHebEnDic[holiday].subHolidays[specHoliday][lang]) ||
      holidaysHebEnDic[match.url.split('/').pop()][lang]
    : tikunReadingPageText.appBarTitle.chumash[lang];

  return (
    <div className={`app-bar-container ${position}`}>
      <AppBar position={position || 'static'} className="app-bar">
        <Toolbar className="toolbar">
          <div className="right-side">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openMenuHandler}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorElMenu}
              keepMounted
              open={Boolean(anchorElMenu)}
              onClose={closeMenuHandler}
              disableRestoreFocus
            >
              <MenuItem onClick={closeMenuHandler}>
                <Link to="/home-nav">{appBarMenuText.menu[lang]}</Link>
              </MenuItem>
              <MenuItem onClick={closeMenuHandler}>
                <Link to="/about">{appBarMenuText.about[lang]}</Link>
              </MenuItem>
            </Menu>
            <h3 className="title">{appBarTitle}</h3>
          </div>
          <div className="left-side">
            {withScreenToggleBtn && isMobile ? (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="screen-rotate"
                onClick={() =>
                  toggleOrientationLock(setIsToraPageReady, setIsLandscape)
                }
              >
                <ScreenRotation />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="share"
                onClick={onClickShareHandler}
              >
                <Share />
              </IconButton>
            )}
            <IconButton
              edge="end"
              color="inherit"
              aria-label={isRTL ? 'arrow-forward' : 'arrow-back'}
              onClick={history.goBack}
            >
              {isRTL ? <ArrowForward /> : <ArrowBack />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ShareMenu
        open={Boolean(anchorElShareList)}
        onClose={closeShareListHandler}
        anchorEl={anchorElShareList}
        lang={lang}
      />
    </div>
  );
}

const ShareMenu = ({ open, onClose, anchorEl, lang }) => {
  const shareUrl =
    'https://play.google.com/store/apps/details?id=il.co.tikunkorim.www.twa';
  const iconProps = { size: 35, round: true };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={onClose}
      disableRestoreFocus
    >
      <MenuItem onClick={onClose}>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <FacebookShareButton
          quote={sharingText.shortTitle[lang]}
          url={shareUrl}
        >
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <EmailShareButton
          subject={sharingText.shortTitle[lang]}
          body={`${sharingText.longTitle[lang]} - ${shareUrl}`}
        >
          <EmailIcon {...iconProps} bgStyle={{ fill: '#ac1a00' }} />
        </EmailShareButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <TelegramShareButton
          title={sharingText.shortTitle[lang]}
          url={shareUrl}
        >
          <TelegramIcon {...iconProps} />
        </TelegramShareButton>
      </MenuItem>
    </Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

const mapDispatchToProps = (dispatch) => ({
  setIsToraPageReady: (isReady) => dispatch(setIsToraPageReady(isReady)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);
