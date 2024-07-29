import { renderPage } from '/utils/functions/renderPage.js';
import './Home.css';
import { Login } from '../Login/Login';
import { navigate } from '../../../utils/functions/navigate';
import { Button } from '../../components/Button/Button';

export const Home = () => {
  const div = renderPage('home');

  // Crear el div para el fondo con una imagen
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'background-container'; // Clase para el contenedor de fondo

  const backgroundImg = document.createElement('img');
  backgroundImg.src = '/image (1) (2).png';
  backgroundImg.alt = 'Fondo de pantalla';
  backgroundImg.className = 'background-image';

  backgroundDiv.appendChild(backgroundImg);
  div.appendChild(backgroundDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'content-wrapper';

  const title = document.createElement('h1');
  title.textContent = 'ArtEventsNow - Tu Guía de Eventos Artísticos';
  contentDiv.appendChild(title);

  const description = document.createElement('p');
  description.innerHTML =
    'Tu aplicación definitiva para descubrir y asistir a eventos artísticos.<br>Desde exposiciones y ferias hasta inauguraciones y espectáculos.';
  contentDiv.appendChild(description);
  const registerMessage = document.createElement('p');
  registerMessage.textContent =
    'Para ver todos nuestros eventos exclusivos, por favor inicia sesión a continuación.';
  contentDiv.appendChild(registerMessage);

  div.appendChild(contentDiv);

  const ctaSection = document.createElement('div');
  ctaSection.className = 'cta-section';

  const loginButton = Button({
    text: 'Iniciar Sesión o Regístrate',
    fnc: (e) => {
      navigate({
        e,
        page: Login,
        path: '/login',
      });
    },
    className: 'cta-button',
  });

  ctaSection.appendChild(loginButton);

  div.appendChild(ctaSection);

  return div;
};
