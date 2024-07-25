import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import './Attendee.css';

export const Attendee = async () => {
  try {
    // Renderizamos la página para obtener el contenedor
    const container = renderPage('attendee');

    // Realizamos la solicitud para obtener la lista de eventos
    const events = await fetchRequest({
      endpoint: '/events',
      method: 'GET',
      //   token: localStorage.getItem('token'), // Si es necesario, incluye el token
    });

    // Extraemos el título y los asistentes de cada evento
    const eventDetails = events.map((event) => ({
      title: event.title,
      attendants: event.attendants.map((attendant) => attendant.userName),
    }));

    // Crear un elemento HTML para mostrar los eventos
    const eventsList = document.createElement('div');
    eventsList.className = 'events-list';

    eventDetails.forEach((event) => {
      const eventElement = document.createElement('div');
      eventElement.className = 'event-item';
      eventElement.innerHTML = `
        <h2>${event.title}</h2>
        <p>Attendants: ${event.attendants.join(', ')}</p>
      `;
      eventsList.appendChild(eventElement);
    });

    // Añadimos los eventos al contenedor
    container.appendChild(eventsList);

    return container; // Devolvemos el contenedor actualizado
  } catch (error) {
    console.error('Error fetching events:', error);
    // Manejo de errores si es necesario
  }
};
