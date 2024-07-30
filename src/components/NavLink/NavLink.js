import { navigate } from '../../../utils/functions/navigate';
import './NavLink.css';

export const NavLink = ({ parentNode, link }) => {
  const { text, page, path, roles } = link;

  let userRole;
  try {
    userRole = localStorage.getItem('rol') || 'guest';
  } catch (e) {
    console.error('Error getting role from localStorage:', e);
    userRole = 'guest';
  }

  if (roles.includes(userRole)) {
    const li = document.createElement('li');
    li.classList.add(
      'nav-link',
      `nav-link-${text.toLowerCase().replaceAll(' ', '-')}`
    );
    const a = document.createElement('a');
    a.textContent = text;
    a.href = path;
    li.append(a);
    parentNode.append(li);
    a.addEventListener('click', (e) => navigate({ e, page, text, path }));

    console.log(`Enlace añadido: ${text}`);
  } else {
    console.log(`Rol "${userRole}" no permitido para el enlace: ${text}`);
  }
};
