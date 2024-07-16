import { ConfirmedEvents } from '../../src/pages/ConfirmedEvents/ConfirmedEvents';
import { Events } from '../../src/pages/Events/Events';
import { Home } from '../../src/pages/Home/Home';
import { Login } from '../../src/pages/Login/Login';
import { Profile } from '../../src/pages/Profile/Profile';
import { Logout } from '../functions/logout';

export const navLinks = [
  {
    text: 'Home',
    path: '/',
    page: Home,
  },
  {
    text: 'Login',
    path: '/login',
    page: Login,
  },

  {
    text: 'Eventos',
    path: '/events',
    page: Events,
  },
  {
    text: 'Mis Eventos Confirmados',
    path: '/confirmed-events',
    page: ConfirmedEvents,
  },
  {
    text: 'Modifica tu Perfil',
    path: '/profile',
    page: Profile,
  },
  {
    text: 'Logout',
    path: '/logout',
    page: Logout,
  },
];
