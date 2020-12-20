import React from 'react';
import { AnimatedRoute } from 'react-router-transition';

function CustomAnimatedRoute({ fade, component }) {
  return !fade ? (
    <AnimatedRoute
      atEnter={pageTransitionStyles.atEnter}
      atLeave={pageTransitionStyles.atLeave}
      atActive={pageTransitionStyles.atActive}
      mapStyles={mapStyles}
      component={component}
    />
  ) : (
    <AnimatedRoute
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      component={component}
    />
  );
}

function mapStyles(styles) {
  return {
    // opacity: styles.opacity,
    right: `${styles.right}%`,
  };
}

const pageTransitionStyles = {
  atEnter: {
    // opacity: 0,
    right: 100,
  },
  atLeave: {
    // opacity: bounce(0),
    right: -100,
  },
  atActive: {
    // opacity: 1,
    right: 0,
  },
};

export default CustomAnimatedRoute;
