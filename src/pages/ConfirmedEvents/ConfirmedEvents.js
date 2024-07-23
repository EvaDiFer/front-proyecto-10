import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import { createEventComponent } from '../../components/EventComponent/EventComponent';

export const ConfirmedEvents = async () => {
  const div = renderPage('confirmed-events');
  div.innerHTML = '<h1>Eventos Confirmados</h1>';

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId) {
    div.innerHTML +=
      '<p>No se encontró el ID del usuario en el localStorage.</p>';
    return;
  }

  try {
    const response = await fetchRequest({
      endpoint: `/users/${userId}`,
      method: 'GET',
      token,
      isJSON: true,
    });

    const events = response.attendingEvents;

    if (!events || events.length === 0) {
      div.innerHTML += '<p>No tienes eventos confirmados.</p>';
      return;
    }

    const eventsContainer = document.createElement('div');
    eventsContainer.classList.add('events-container');

    events.forEach((event) => {
      const eventElement = createEventComponent(
        event,
        'Cancelar Asistencia', // Texto del botón
        false,
        true // Indica que estamos en la página de eventos confirmados
      );
      eventsContainer.appendChild(eventElement);
    });

    div.appendChild(eventsContainer);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    div.innerHTML += `<p>Error al cargar eventos confirmados: ${error.message}</p>`;
  }
};
