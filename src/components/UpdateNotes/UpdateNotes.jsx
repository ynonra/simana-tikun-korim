import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNotesData } from '../../redux/tikun/tikun.selectors';

import './UpdateNotes.scss';

const UpdateNotes = ({ noteName, notesData }) => {
  const noteData = notesData && notesData[`note_${noteName}`];

  const LinkContainer = ({ url, children }) =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {children}
      </a>
    ) : (
      <div>{children}</div>
    );

  return noteData ? (
    <LinkContainer url={noteData.url}>
      <div style={noteData.container && noteData.container.style}>
        <div style={noteData.textContainer && noteData.textContainer.style}>
          <span style={noteData.text && noteData.text.style}>
            {noteData.text && noteData.text.content}
          </span>
        </div>
      </div>
    </LinkContainer>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  notesData: selectNotesData,
});

export default connect(mapStateToProps)(UpdateNotes);
