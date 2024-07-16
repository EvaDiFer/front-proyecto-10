import { renderPage } from '/utils/functions/renderPage.js';
import './Home.css';

export const Home = () => {
  const div = renderPage('home');
  div.innerHTML = `<h1>Esto es la home</h1>`;

  const paragraph = document.createElement('p');
  paragraph.textContent = 'Bienvenido a la página de inicio';
  div.append(paragraph);

  const button = document.createElement('button');
  button.textContent = 'Click me';
  div.append(button);
};
