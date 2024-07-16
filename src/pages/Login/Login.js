import { goLogin } from '../../../utils/functions/goLogin';
import { goRegister } from '../../../utils/functions/goRegister';
import { navigate } from '../../../utils/functions/navigate';
import { renderPage } from '../../../utils/functions/renderPage';
import { Button } from '../../components/Button/Button';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { Events } from '../Events/Events';
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
        ? 'Registrate si no tienes cuenta'
        : 'Vete a login si ya tienes cuenta';
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
      if (showLogin) {
        await goLogin(event);
      } else {
        await goRegister(event);
      }

      welcomeMessage.textContent =
        'Bienvenido! Redirigiendo a la página de eventos...';
      welcomeMessage.style.display = 'block';
      setTimeout(() => {
        navigate({ e: event, page: Events, path: '/events' });
      }, 2000);
    } catch (error) {
      console.error(error);
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
