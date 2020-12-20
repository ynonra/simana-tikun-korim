import React, { useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import CustomAnimatedSwitch from '../../components/CustomAnimatedSwitch/CustomAnimatedSwitch.component';
import AppBar from '../../components/AppBar/AppBar.component';
import Footer from '../../components/Footer/Footer';
import TikunReadingPage from '../TikunReadingPage/TikunReadingPage.component';
import NavButton from '../../components/NavButton/NavButton.component';

import ModalDialog from '../../components/modalDialog/modalDialog.component';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { IconButton } from '@material-ui/core';

import { get, set } from 'idb-keyval';

import { Delete, Edit } from '@material-ui/icons';

import './TikunBookmarksPage.styles.scss';

const TikunBookmarksPage = () => {
  const [bookmarksData, setBookmarksData] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuccessDeleteNoteOpen, setIsSuccessDeleteNoteOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuccessEditNoteOpen, setIsSuccessEditNoteOpen] = useState(false);
  const [bookmarkIndexInAction, setBookmarkIndexInAction] = useState(null);

  const match = useRouteMatch();

  useEffect(() => {
    const getBookmarksData = async () => {
      const bookmarksData = await get('bookmarks');
      setBookmarksData(bookmarksData || []);
    };
    getBookmarksData();
  }, []);

  function deleteBookmarkHandler(bookmarkIndex) {
    let newBookmarksData = [...bookmarksData];

    newBookmarksData.splice(bookmarkIndex, 1);
    setBookmarksData(newBookmarksData);
    set('bookmarks', newBookmarksData);
    setIsSuccessDeleteNoteOpen(true);
  }

  function editBookmarkConfirm(bookmarkIndex, title) {
    let newBookmarksData = [...bookmarksData];
    newBookmarksData[bookmarkIndex].title = title;
    setBookmarksData(newBookmarksData);
    set('bookmarks', newBookmarksData);
    setIsSuccessEditNoteOpen(true);
  }

  let i = 0;

  return (
    <CustomAnimatedSwitch>
      <Route exact path={match.path}>
        <div className="bookmarks-page page default-background">
          <AppBar title="סימניות" />
          <div className="bookmarks-buttons-container">
            {bookmarksData && bookmarksData.length ? (
              bookmarksData.map((bookmarkData) => {
                const bookmarkIndex = i++;
                return (
                  <div
                    className="bookmark-button-container"
                    key={Math.random()}
                  >
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => {
                        setBookmarkIndexInAction(bookmarkIndex);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="edit"
                      onClick={() => {
                        setBookmarkIndexInAction(bookmarkIndex);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <NavButton
                      key={Math.random()}
                      title={bookmarkData.title}
                      url={i}
                    ></NavButton>
                  </div>
                );
              })
            ) : (
              <h2>לא נמצאו סימניות</h2>
            )}
          </div>
          <ModalDialog
            withInput
            title="ערוך שם סימניה"
            handleClose={() => setIsEditDialogOpen(false)}
            isOpenDialog={isEditDialogOpen}
            label="שם סימניה"
            getInitialInputValue={() =>
              bookmarksData &&
              bookmarksData[bookmarkIndexInAction] &&
              bookmarksData[bookmarkIndexInAction].title
            }
            handleConfirm={(title) => {
              editBookmarkConfirm(bookmarkIndexInAction, title);
            }}
          />
          <ModalDialog
            title="מחק סימניה"
            description="האם ברצונך למחוק את הסימניה?"
            handleClose={() => setIsDeleteDialogOpen(false)}
            isOpenDialog={isDeleteDialogOpen}
            handleConfirm={() => {
              deleteBookmarkHandler(bookmarkIndexInAction);
            }}
          />
          <Snackbar
            open={isSuccessDeleteNoteOpen}
            autoHideDuration={4000}
            onClose={() => setIsSuccessDeleteNoteOpen(false)}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={() => setIsSuccessDeleteNoteOpen(false)}
              severity="success"
            >
              הסימניה נמחקה!
            </Alert>
          </Snackbar>
          <Snackbar
            open={isSuccessEditNoteOpen}
            autoHideDuration={4000}
            onClose={() => setIsSuccessEditNoteOpen(false)}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={() => setIsSuccessEditNoteOpen(false)}
              severity="success"
            >
              שם הסימניה השתנה!
            </Alert>
          </Snackbar>
          <Footer />
        </div>
      </Route>
      <Route path={`${match.path}/:bookmarkNum`}>
        <TikunReadingPage isBookmark />
      </Route>
    </CustomAnimatedSwitch>
  );
};

export default TikunBookmarksPage;
