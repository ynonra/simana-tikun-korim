export function swipingPageEffect(absX, dir) {
  const pageTextElem = document.querySelector('.just-humash-text');
  if (!pageTextElem) return;
  const scrollViewElem = document.querySelector('.scroll-view-fixed-container');
  const pageSwipingGradient = document.querySelector('#page-swiping-gradient');
  const leftArrowElem = document.querySelector(`#page-swiped-left-arrow`);
  const rightArrowElem = document.querySelector(`#page-swiped-right-arrow`);

  const deltaXSign = dir === 'Left' ? 1 : -1;
  const maxDeltaX = 35;
  const minTextTransparent = 0.4;
  const translateX =
    absX <= maxDeltaX ? -absX * deltaXSign : -deltaXSign * maxDeltaX;
  const textTransparent =
    absX <= maxDeltaX
      ? (1 - minTextTransparent) * ((maxDeltaX - absX) / maxDeltaX) +
        minTextTransparent
      : minTextTransparent;
  const gradientOpacity = (absX <= maxDeltaX ? absX / maxDeltaX : 1).toString();
  pageTextElem.style.transitionDuration = '0s';
  scrollViewElem.style.transitionDuration = '0s';
  pageTextElem.style.transformOrigin = dir;
  pageTextElem.style.transform = `
      translateX(${translateX}px)`;
  pageTextElem.style.opacity = textTransparent;
  scrollViewElem.style.opacity = textTransparent;
  pageSwipingGradient.style.transition = '0s';
  pageSwipingGradient.className = `${dir.toLowerCase()}-gradient`;
  pageSwipingGradient.style.zIndex = '100';
  pageSwipingGradient.style.opacity = gradientOpacity;

  if (absX >= maxDeltaX) {
    let arrowElem;
    if (dir === 'Left') arrowElem = rightArrowElem;
    if (dir === 'Right') arrowElem = leftArrowElem;

    arrowElem.classList.add('show-arrow');
  } else {
    rightArrowElem.classList.remove('show-arrow');
    leftArrowElem.classList.remove('show-arrow');
  }
}

export function swipedPageEffect(deltaX, pageNum) {
  const pageTextElem = document.querySelector('.just-humash-text');
  if (!pageTextElem) return;
  const scrollViewElem = document.querySelector('.scroll-view-fixed-container');
  const pageSwipingGradient = document.querySelector('#page-swiping-gradient');
  const leftArrowElem = document.querySelector(`#page-swiped-left-arrow`);
  const rightArrowElem = document.querySelector(`#page-swiped-right-arrow`);

  pageSwipingGradient.style.transition = '.2s';
  pageSwipingGradient.style.opacity = '0';
  setTimeout(() => {
    pageSwipingGradient.style.zIndex = '0';
    pageSwipingGradient.className = '';
  }, 200);

  if (
    !rightArrowElem.classList.contains('show-arrow') &&
    !leftArrowElem.classList.contains('show-arrow')
  ) {
    pageTextElem.style.transform = `translateX(0)`;
    pageTextElem.style.transitionDuration = '0.5s';
    pageTextElem.style.opacity = 1;
    scrollViewElem.style.transitionDuration = '0.5s';
    scrollViewElem.style.opacity = 1;
    rightArrowElem.classList.remove('show-arrow');
    leftArrowElem.classList.remove('show-arrow');
  } else {
    rightArrowElem.classList.remove('show-arrow');
    leftArrowElem.classList.remove('show-arrow');
    // setTextDoms(null);
    return deltaX < 0 && pageNum < 245
      ? 'next'
      : deltaX > 0 && pageNum > 1
      ? 'prev'
      : returnTextStyles();
  }
}

export function returnTextStyles() {
  const justTextElem = document.querySelector('.just-humash-text');
  if (!justTextElem) return;
  justTextElem.style.transform = '';
  justTextElem.style.opacity = '';
}
