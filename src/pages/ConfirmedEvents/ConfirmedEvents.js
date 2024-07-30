import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import { createEventComponent } from '../../components/EventComponent/EventComponent';
import './ConfirmedEvents.css';

export const ConfirmedEvents = async () => {
  const div = renderPage('confirmed-events');
  if (!div) {
    console.error('Contenedor "confirmed-events" no encontrado');
    return;
  }

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
        'Cancelar Asistencia',
        false,
        true // Indica que estamos en la página de eventos confirmados
      );
      eventsContainer.appendChild(eventElement);
    });

    div.appendChild(eventsContainer);

    // Añadir un listener global para actualizar la lista de eventos confirmados
    window.addEventListener('attendanceChanged', async () => {
      // Limpia el contenedor actual
      eventsContainer.innerHTML = '';

      // Re-fetch the events
      try {
        const updatedResponse = await fetchRequest({
          endpoint: `/users/${userId}`,
          method: 'GET',
          token,
          isJSON: true,
        });
        const updatedEvents = updatedResponse.attendingEvents;

        if (!updatedEvents || updatedEvents.length === 0) {
          div.innerHTML = '<p>No tienes eventos confirmados.</p>';
        } else {
          updatedEvents.forEach((event) => {
            const updatedEventElement = createEventComponent(
              event,
              'Cancelar Asistencia',
              false,
              true
            );
            eventsContainer.appendChild(updatedEventElement);
          });
        }
      } catch (error) {
        console.error('Error al actualizar eventos confirmados:', error);
        div.innerHTML = `<p>Error al actualizar eventos confirmados: ${error.message}</p>`;
      }
    });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    div.innerHTML += `<p>Error al cargar eventos confirmados: ${error.message}</p>`;
  }
};
