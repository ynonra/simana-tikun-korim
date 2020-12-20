import React from 'react';

import './BookIcon.styles.scss';

const BookIcon = () => {
  return (
    <div className="book-icon-container">
      <div className="book">
        <div className="front"></div>
        <div className="page1"></div>
        <div className="page2"></div>
        <div className="page3"></div>
        <div className="page4"></div>
        <div className="page5"></div>
        <div className="page6"></div>
        <div className="back"></div>
      </div>
    </div>
  );
};

export default BookIcon;
