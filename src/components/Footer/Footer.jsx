import React from 'react';

import { ReactComponent as FooterLogo } from '../../assets/icons/logo-bottom.svg';
import LanguageBtn from '../LanguageBtn/LanguageBtn';

import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <LanguageBtn />
      <FooterLogo className="logo" />
    </footer>
  );
};

export default Footer;
