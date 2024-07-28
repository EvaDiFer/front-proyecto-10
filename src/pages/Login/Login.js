import { goLogin } from '../../../utils/functions/goLogin';
import { goRegister } from '../../../utils/functions/goRegister';
import { navigate } from '../../../utils/functions/navigate';
import { renderPage } from '../../../utils/functions/renderPage';
import { Button } from '../../components/Button/Button';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { CreateEvent } from '../CreateEvent/CreateEvent';
import { Events } from '../Events/Events';
import { UserGestion } from '../UserGestion/UserGestion';

import './Login.css';

let showLogin = true;

export const Login = () => {
  const div = renderPage('login');

  const form = document.createElement('form');
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.display = 'none';

  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'welcome-message';
  welcomeMessage.style.display = 'none';

  const toggleButton = Button({
    text: 'Registrate si no tienes cuenta',
    fnc: () => {
      showLogin = !showLogin;
      showLogin ? LoginForm(form) : RegisterForm(form);
      toggleButton.textContent = showLogin
        ? 'Nuevo Usuario'
        : 'Entra en tu cuenta';
      if (showLogin) {
        form.removeEventListener('submit', goRegister);
      } else {
        form.removeEventListener('submit', goLogin);
      }

      form.addEventListener('submit', handleSubmit);
    },
    className: 'button-toggle',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    spinner.style.display = 'block';
    welcomeMessage.style.display = 'none';

    try {
      const isAuthenticated = showLogin
        ? await goLogin(event)
        : await goRegister(event);

      if (isAuthenticated) {
        welcomeMessage.textContent = 'Bienvenido!';
        welcomeMessage.style.display = 'block';
        setTimeout(() => {
          const role = localStorage.getItem('rol');
          if (role === 'admin') {
            navigate({
              e: event,
              page: CreateEvent,
              path: '/event-administration',
            }); // Redirige al administrador
          } else {
            navigate({ e: event, page: Events, path: '/events' }); // Redirige a la página de eventos
          }
        }, 1000);
      } else {
        throw new Error('Autenticación fallida.');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      welcomeMessage.textContent = error.message || 'Error de autenticación.';
      welcomeMessage.style.display = 'block';
    } finally {
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 2000);
    }
  };

  form.addEventListener('submit', handleSubmit);

  LoginForm(form);
  div.append(toggleButton);
  div.append(form);
  div.append(spinner);
  div.append(welcomeMessage);
};
