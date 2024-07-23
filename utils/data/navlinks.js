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
    page: Home, // Asume que `Home` es el componente importado correspondiente
    roles: ['guest'], // Solo permitido para usuarios invitados (guest)
  },
  {
    text: 'Login',
    path: '/login',
    page: Login, // Asume que `Login` es el componente importado correspondiente
    roles: ['guest'], // Solo permitido para usuarios invitados (guest)
  },
  {
    text: 'Eventos',
    path: '/events',
    page: Events, // Asume que `Events` es el componente importado correspondiente
    roles: ['user'], // Permitido para usuarios con rol "user"
  },
  {
    text: 'Mis Eventos Confirmados',
    path: '/confirmed-events',
    page: ConfirmedEvents, // Asume que `ConfirmedEvents` es el componente importado correspondiente
    roles: ['user'], // Permitido para usuarios con rol "user"
  },
  {
    text: 'Modifica tu Perfil',
    path: '/profile',
    page: Profile, // Asume que `Profile` es el componente importado correspondiente
    roles: ['user'], // Permitido para usuarios con rol "user"
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
    page: Logout, // Asume que `Logout` es el componente importado correspondiente
    roles: ['user', 'admin'], // Permitido para usuarios con rol "user"
  },
];
