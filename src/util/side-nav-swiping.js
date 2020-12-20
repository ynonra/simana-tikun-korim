//   function openSideNavHandler() {
//     startSwipeRightSideNavDistance = sideNavWidth;
//     sideNavSlide('in');
//   }

//   function closeSideNavHandler() {
//     startSwipeRightSideNavDistance = 0;
//     sideNavSlide('out');
//   }

//   function changeSideNavRightDistance(dir, deltaX, isFirst) {
//     const navElement = document.querySelector('.tikun-side-nav');
//     let validRightDis;
//     if (startSwipeRightSideNavDistance + deltaX > sideNavWidth) {
//       validRightDis = 0;
//     } else if (startSwipeRightSideNavDistance + deltaX <= 0) {
//       validRightDis = -sideNavWidth;
//     } else
//       validRightDis = startSwipeRightSideNavDistance + deltaX - sideNavWidth;
//     navElement.style.right = validRightDis + 'px';
//     if (isFirst && dir === 'Left') darkPageEffect('in');
//   }

//   function sideNavSlide(slideMode) {
//     const navElement = document.querySelector('.tikun-side-nav');
//     navElement.style.transitionDuration = '0.15s';
//     setTimeout(() => {
//       navElement.style.transitionDuration = 'unset';
//     }, 300);

//     if (slideMode === 'in') {
//       navElement.style.right = '0';
//       startSwipeRightSideNavDistance = sideNavWidth;
//     }
//     if (slideMode === 'out') {
//       navElement.style.right = `-${sideNavWidth}px`;
//       startSwipeRightSideNavDistance = 0;
//     }
//     darkPageEffect(slideMode);
//   }

//   function darkPageEffect(fadeMode) {
//     const navElement = document.querySelector('.tikun-side-nav');
//     const fadeElement = pageFadeModalRef.current;
//     fadeElement.classList.remove(
//       `dark-background-fade-${fadeMode === 'in' ? 'out' : 'in'}`
//     );
//     fadeElement.classList.add(`dark-background-fade-${fadeMode}`);
//     navElement.classList[fadeMode === 'in' ? 'add' : 'remove']('shadow');
//     document.body.classList[fadeMode === 'in' ? 'add' : 'remove'](
//       'scroll-lock'
//     );
//     if (fadeMode === 'out') {
//       document
//         .querySelector('.palette-buttons-container')
//         .classList.add('hide');
//       const aliyotButtons = document.querySelector(
//         '.tikun-side-nav .aliyot-buttons'
//       );
//       if (aliyotButtons) aliyotButtons.classList.add('hide');
//     }
//   }

//   function isSideNavOpen() {
//     const fadeElement = pageFadeModalRef.current;
//     return fadeElement.classList.contains('dark-background-fade-in');
//   }

//   function setTouchMoveMoving(ev) {
//     isSwipeMoveStop = false;
//   }

//   function setTouchMoveStops() {
//     isSwipeMoveStop = true;
//   }
