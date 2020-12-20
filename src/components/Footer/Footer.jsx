import React from 'react';

import { ReactComponent as FooterLogo } from '../../assets/icons/logo-bottom.svg';

import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <FooterLogo className="logo" />
    </footer>
  );
};

export default Footer;
