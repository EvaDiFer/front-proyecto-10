import { RenderLinks } from '../../../utils/functions/renderLinks';

import './Header.css';
export const Header = () => {
  const app = document.querySelector('#app');
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const burgerButton = document.createElement('button');

  header.classList.add('header-class');
  nav.classList.add('nav-class');
  ul.classList.add('ul-class');
  burgerButton.classList.add('burger-button');

  burgerButton.innerHTML = '&#9776;';

  app.append(header);
  header.append(burgerButton);
  header.append(nav);
  nav.append(ul);

  burgerButton.addEventListener('click', () => {
    ul.classList.toggle('ul-open');
  });

  RenderLinks();
};
