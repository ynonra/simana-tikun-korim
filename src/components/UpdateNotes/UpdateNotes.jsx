import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLang, selectNotesData } from '../../redux/tikun/tikun.selectors';

import './UpdateNotes.scss';

const UpdateNotes = ({ noteName, notesData, lang }) => {
  const noteData = notesData?.[`note_${noteName}`];

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
      <div style={noteData.container?.style}>
        <div style={noteData.textContainer?.style}>
          <span style={noteData.text?.style}>
            {noteData.text?.content[lang]}
          </span>
        </div>
      </div>
    </LinkContainer>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  notesData: selectNotesData,
  lang: selectLang,
});

export default connect(mapStateToProps)(UpdateNotes);
