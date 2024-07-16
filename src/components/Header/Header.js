import { navLinks } from '../../../utils/data/navlinks';

import { NavLink } from '../NavLink/NavLink';

import './Header.css';

export const Header = () => {
  const app = document.querySelector('#app');

  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  ul.innerHTML = '';
  for (const link of navLinks) {
    NavLink({ parentNode: ul, link });
  }

  app.append(header);
  header.append(nav);
  nav.append(ul);
};
