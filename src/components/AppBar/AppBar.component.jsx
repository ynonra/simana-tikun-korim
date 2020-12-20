import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsToraPageReady } from '../../redux/tikun/tikun.actions';

import {
  ArrowForward,
  Menu as MenuIcon,
  ScreenRotation,
} from '@material-ui/icons';
import { Toolbar, IconButton, AppBar, Menu, MenuItem } from '@material-ui/core';

import { holidaysHebEnDic } from '../../data/parashot-by-books-dic';

import { toggleOrientationLock } from '../../util/screen';
import { isMobile } from 'react-device-detect';

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
}) {
  const match = useRouteMatch();
  const { holiday, specHoliday } = match.params;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const appBarTitle = title
    ? title
    : isParashatHashavuaTitle
    ? 'פרשת השבוע'
    : isBookmarkTitle
    ? 'סימניה'
    : calcHolidayTitle
    ? (holiday && holidaysHebEnDic[holiday].subHolidays[specHoliday].heb) ||
      holidaysHebEnDic[match.url.split('/').pop()].heb
    : 'חומש';

  return (
    <div className={`app-bar-container ${position}`}>
      <AppBar position={position || 'static'} className="app-bar">
        <Toolbar className="toolbar">
          <div className="right-side">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableRestoreFocus
            >
              <MenuItem onClick={handleClose}>
                <Link to="/home-nav">תפריט ראשי</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/about">אודות</Link>
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
            ) : null}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="arrow-forward"
              onClick={history.goBack}
            >
              <ArrowForward />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setIsToraPageReady: (isReady) => dispatch(setIsToraPageReady(isReady)),
});

export default connect(null, mapDispatchToProps)(AppBarComponent);
