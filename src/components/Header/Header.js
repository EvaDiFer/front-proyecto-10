import { RenderLinks } from '../../../utils/functions/renderLinks';

import './Header.css';
export const Header = () => {
  const app = document.querySelector('#app');
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  app.append(header);
  header.append(nav);

  nav.append(ul);
  RenderLinks();
};
