import React from 'react';
import { selectLang } from '../../redux/tikun/tikun.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import { instructionsText } from '../../data/lang-dic';
import './InstructionDialog.scss';

const InstructionDialog = ({ open, onClose, lang }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className="instruction-dialog"
    onClick={onClose}
  >
    <DialogTitle id="alert-dialog-title">
      {instructionsText.title[lang]}
    </DialogTitle>
    <DialogContent>
      <ul>
        <li>
          <span className="sub-title">
            {instructionsText.changeNikudInstructions.title[lang]}:
          </span>{' '}
          {instructionsText.changeNikudInstructions.description[lang]}
        </li>
        <li>
          <span className="sub-title">
            {instructionsText.changePageInstructions.title[lang]}:
          </span>{' '}
          {instructionsText.changePageInstructions.description[lang]}
        </li>
        <li>
          <span className="sub-title">
            {instructionsText.listenToTaam.title[lang]}:
          </span>{' '}
          {instructionsText.listenToTaam.description[lang]}
        </li>
        <li>
          <span className="sub-title">
            {instructionsText.openSidebarMenu.title[lang]}:
          </span>{' '}
          {instructionsText.openSidebarMenu.description[lang]}
        </li>
      </ul>
    </DialogContent>
  </Dialog>
);

const mapStateToProps = createStructuredSelector({
  lang: selectLang,
});

export default connect(mapStateToProps)(InstructionDialog);
