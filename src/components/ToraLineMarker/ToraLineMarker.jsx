import React, { useEffect, useRef } from 'react';

import './ToraLineMarker.scss';

const ToraLineMarker = ({ lineIndex }) => {
  const ToraLineMarkerRef = useRef(null);

  useEffect(() => {
    const lineElem = document.querySelector(`[name="line-index-${lineIndex}"]`);
    // const { bottom, top, right, left } = lineElem.getBoundingClientRect();
    // ToraLineMarkerRef.current.style.bottom = ''
    lineElem.style.fontWeight = 'bold';
  }, [lineIndex]);

  return <div className="tora-line-marker" ref={ToraLineMarkerRef}></div>;
};

export default ToraLineMarker;
