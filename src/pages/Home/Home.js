import { renderPage } from '/utils/functions/renderPage.js';
import './Home.css';
import { Login } from '../Login/Login';
import { navigate } from '../../../utils/functions/navigate';
import { Button } from '../../components/Button/Button';

export const Home = () => {
  const div = renderPage('home');

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Bienvenidos a Nuestra Página de Eventos';

  div.appendChild(title);

  // Descripción
  const description = document.createElement('p');
  description.textContent =
    'Explora los eventos más emocionantes que hemos preparado para ti. ¡No te los pierdas!';
  div.appendChild(description);

  // Mensaje de registro
  const registerMessage = document.createElement('p');
  registerMessage.textContent =
    'Para ver todos nuestros eventos exclusivos, por favor inicia sesión a continuación.';
  div.appendChild(registerMessage);

  // Sección de botón de llamada a la acción
  const ctaSection = document.createElement('section');
  ctaSection.style.textAlign = 'center';

  // Utiliza el componente Button en lugar de crear el botón manualmente
  const loginButton = Button({
    text: 'Iniciar Sesión o Regístrate',
    fnc: (e) => {
      navigate({
        e,
        page: Login,
        path: '/login',
      });
    },
    className: 'cta-button', // Añade una clase adicional si necesitas estilizar el botón
  });

  ctaSection.appendChild(loginButton);

  div.appendChild(ctaSection);

  return div;
};
