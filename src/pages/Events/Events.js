import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import { createEventComponent } from '../../components/EventComponent/EventComponent';
import './Events.css';

export const Events = async () => {
  // Renderizamos la página de eventos
  const div = renderPage('events');

  const heading = document.createElement('h1');
  heading.textContent = 'Estos son los eventos para ti';
  div.appendChild(heading);

  try {
    // Realizamos la solicitud para obtener la lista de eventos
    const response = await fetchRequest({
      endpoint: '/events',
      // token: localStorage.getItem('token'),
    });

    console.log(response);

    response.forEach((event) => {
      const eventElement = createEventComponent(event);
      div.appendChild(eventElement);
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error.message);
  }
};
