import { Home } from '../../src/pages/Home/Home';
import { navLinks } from '../data/navlinks';

const loadPage = (path) => {
  const link = navLinks.find((link) => link.path === path);
  if (link) {
    link.page();
  } else {
    Home();
    window.history.pushState('', '', '/');
  }
};

export const popStateListener = () => {
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
  });

  loadPage(window.location.pathname);
};
