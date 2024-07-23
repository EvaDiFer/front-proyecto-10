import { NavLink } from '../../src/components/NavLink/NavLink';
import { navLinks } from '../data/navlinks';

export const RenderLinks = () => {
  const ul = document.querySelector('ul');

  ul.innerHTML = '';
  for (const link of navLinks) {
    NavLink({ parentNode: ul, link });
  }
};
