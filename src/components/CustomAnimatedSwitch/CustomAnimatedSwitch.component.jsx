import React from 'react';
import { Switch } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition';

function CustomAnimatedSwitch({ children, fade }) {
  return <Switch>{children}</Switch>;
  //   return fade ? (
  //     <AnimatedSwitch
  //       atEnter={pageTransitionStyles.atEnter}
  //       atLeave={pageTransitionStyles.atLeave}
  //       atActive={pageTransitionStyles.atActive}
  //       mapStyles={mapStyles}
  //       className="route-wrapper"
  //     >
  //       {children}
  //     </AnimatedSwitch>
  //   ) : (
  //     <AnimatedSwitch
  //       atEnter={{ opacity: 0 }}
  //       atLeave={{ opacity: 0 }}
  //       atActive={{ opacity: 1 }}
  //       className="route-wrapper"
  //     >
  //       {children}
  //     </AnimatedSwitch>
  //   );
  // }

  // function mapStyles(styles) {
  //   return {
  //     // opacity: styles.opacity,
  //     right: `${styles.right}%`,
  //   };
  // }

  // const pageTransitionStyles = {
  //   atEnter: {
  //     // opacity: 0,
  //     right: 100,
  //   },
  //   atLeave: {
  //     // opacity: bounce(0),
  //     right: -100,
  //   },
  //   atActive: {
  //     // opacity: 1,
  //     right: 0,
  //   },
}

export default CustomAnimatedSwitch;
