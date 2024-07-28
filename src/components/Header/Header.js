import { RenderLinks } from '../../../utils/functions/renderLinks';

import './Header.css';
export const Header = () => {
  const app = document.querySelector('#app');
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  header.classList.add('header-class');
  nav.classList.add('nav-class');
  ul.classList.add('ul-class');

  app.append(header);
  header.append(nav);
  nav.append(ul);

  RenderLinks();
};
