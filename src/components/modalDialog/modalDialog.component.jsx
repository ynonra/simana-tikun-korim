import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectLang } from '../../redux/tikun/tikun.selectors';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { modalText } from '../../data/lang-dic';
import './modalDialog.scss';

const ModalDialog = ({
  handleClose,
  isOpenDialog,
  title,
  description,
  label,
  handleConfirm,
  withInput,
  getInitialInputValue,
  lang,
}) => {
  const [inputValue, setInputValue] = useState(
    getInitialInputValue && getInitialInputValue()
  );

  return (
    <Dialog
      open={isOpenDialog}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
      className="dialog-root"
    >
      {title ? <DialogTitle id="form-dialog-title">{title}</DialogTitle> : null}
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {withInput ? (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type="text"
            defaultValue={getInitialInputValue && getInitialInputValue()}
            fullWidth
            onChange={(ev) => setInputValue(ev.target.value)}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
        >
          {modalText.cancel[lang]}
        </Button>
        <Button
          onClick={() => {
            handleClose();
            handleConfirm(inputValue);
          }}
          color="primary"
        >
          {modalText.confirm[lang]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(ModalDialog);
