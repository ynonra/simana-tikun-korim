import React from 'react';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import './InstructionDialog.scss';

const InstructionDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className="instruction-dialog"
    onClick={onClose}
  >
    <DialogTitle id="alert-dialog-title">הוראות</DialogTitle>
    <DialogContent>
      {/* <DialogContentText id="alert-dialog-description"> */}
      <ul>
        <li>
          <span className="sub-title">הוספת / העלמת ניקוד:</span> לחץ על הכיתוב
        </li>
        <li>
          <span className="sub-title">העברת עמוד:</span> החלק את המסך ימינה /
          שמאלה, או הקש במקלדת ⇨ / ⇦
        </li>
        <li>
          <span className="sub-title">האזנה לטעם מקרא:</span> לפלאפון - לחץ
          לחיצה ארוכה על מילה. למחשב - לחץ על המילה באמצעות הכפתור הימני בעכבר
        </li>
        <li>
          <span className="sub-title">פתיחת תפריט אפשרויות:</span> החלק את המסך
          מימין, או לחץ על כפתור גלגל השיניים, או הקש במקלדת <b>א</b>
        </li>
      </ul>
      {/* </DialogContentText> */}
    </DialogContent>
  </Dialog>
);

export default InstructionDialog;
