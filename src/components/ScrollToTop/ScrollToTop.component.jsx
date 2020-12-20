import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}

export const scrollToTop = () => {
  const pageElement = document.querySelector('.page');
  pageElement && pageElement.scrollTo(0, 0);
};
