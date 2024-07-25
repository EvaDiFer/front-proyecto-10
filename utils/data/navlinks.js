import { Attendee } from '../../src/pages/Attendee/Attendee';
import { ConfirmedEvents } from '../../src/pages/ConfirmedEvents/ConfirmedEvents';
import { CreateEvent } from '../../src/pages/CreateEvent/CreateEvent';
import { Events } from '../../src/pages/Events/Events';
import { Home } from '../../src/pages/Home/Home';
import { Login } from '../../src/pages/Login/Login';
import { Profile } from '../../src/pages/Profile/Profile';
import { UserGestion } from '../../src/pages/UserGestion/UserGestion';
import { Logout } from '../functions/logout';

export const navLinks = [
  {
    text: 'Home',
    path: '/',
    page: Home,
    roles: ['guest'],
  },
  {
    text: 'Login',
    path: '/login',
    page: Login,
    roles: ['guest'],
  },
  {
    text: 'Eventos',
    path: '/events',
    page: Events,
    roles: ['user'],
  },
  {
    text: 'Mis Eventos Confirmados',
    path: '/confirmed-events',
    page: ConfirmedEvents,
    roles: ['user'],
  },
  {
    text: 'Asistentes a Eventos',
    path: '/attendee',
    page: Attendee,
    roles: ['user'],
  },
  {
    text: 'Modifica tu Perfil',
    path: '/profile',
    page: Profile,
    roles: ['user', 'admin'],
  },
  {
    text: 'Gestión de Eventos',
    path: '/event-administration',
    page: CreateEvent,
    roles: ['admin'],
  },
  {
    text: 'Gestión de Usuarios',
    path: '/user-administration',
    page: UserGestion,
    roles: ['admin'],
  },
  {
    text: 'Logout',
    path: '/logout',
    page: Logout,
    roles: ['user', 'admin'],
  },
];
