import { fetchRequest } from '../../../utils/API/fetch';
import { cancelAttendance } from '../../../utils/functions/cancelAttendance';
import { confirmAttendance } from '../../../utils/functions/confirmAttendance';

const getCurrentUserId = () => {
  return localStorage.getItem('userId') || 'defaultUserId';
};

const fetchAttendeesByEvent = async (eventId, token) => {
  try {
    const response = await fetchRequest({
      endpoint: `/events/${eventId}/attendees`,
      token,
    });
    return response;
  } catch (error) {
    console.error('Error al obtener la lista de asistentes:', error);
    return [];
  }
};

export const createEventComponent = (
  event,
  buttonText = 'Confirmar Asistencia',
  showCreatedBy = true,
  isConfirmedPage = false
) => {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');
  eventDiv.id = `event-${event._id}`;

  const token = localStorage.getItem('token');
  const userId = getCurrentUserId();

  if (event.imageUrl) {
    const image = document.createElement('img');
    image.src = event.imageUrl;
    image.alt = `Imagen para ${event.title}`;
    eventDiv.appendChild(image);
  }

  const title = document.createElement('h2');
  title.textContent = event.title;
  eventDiv.appendChild(title);

  const description = document.createElement('p');
  description.textContent = event.description;
  eventDiv.appendChild(description);

  const date = document.createElement('p');
  date.textContent = `Fecha: ${new Date(event.date).toLocaleDateString()}`;
  eventDiv.appendChild(date);

  if (showCreatedBy) {
    const createdBy = document.createElement('p');
    createdBy.textContent =
      event.createdBy && event.createdBy.userName
        ? `Creado por: ${event.createdBy.userName}`
        : `Creado por: Información no disponible`;
    eventDiv.appendChild(createdBy);
  }

  const actionButton = document.createElement('button');

  const updateButtonState = (isConfirmed) => {
    if (isConfirmedPage) {
      actionButton.textContent = isConfirmed
        ? 'Cancelar Asistencia'
        : 'No Confirmado';
      actionButton.disabled = !isConfirmed;
    } else {
      actionButton.textContent = isConfirmed
        ? 'Asistencia Confirmada'
        : buttonText;
      actionButton.disabled = isConfirmed;
    }
  };

  const handleAttendance = async () => {
    try {
      const attendees = await fetchAttendeesByEvent(event._id, token);
      const isAttendanceConfirmed = attendees.some(
        (attendant) => attendant._id === userId
      );

      if (isConfirmedPage) {
        if (isAttendanceConfirmed) {
          await cancelAttendance(event._id, userId, token);
          updateButtonState(false);
          eventDiv.remove();
          window.dispatchEvent(new Event('attendanceChanged'));
        }
      } else {
        if (isAttendanceConfirmed) {
          return;
        } else if (actionButton.textContent === 'Confirmar Asistencia') {
          await confirmAttendance(event._id, userId, token);
          updateButtonState(true);
          const confirmedEventsContainer =
            document.getElementById('confirmed-events');
          if (confirmedEventsContainer) {
            confirmedEventsContainer.appendChild(eventDiv);
          }
          window.dispatchEvent(new Event('attendanceChanged'));
        }
      }
    } catch (error) {
      console.error('Error al actualizar el estado de asistencia:', error);
    }
  };

  fetchAttendeesByEvent(event._id, token)
    .then((attendees) => {
      const isAttendanceConfirmed = attendees.some(
        (attendant) => attendant._id === userId
      );
      updateButtonState(isAttendanceConfirmed);
    })
    .catch((error) => {
      console.error('Error al obtener la lista de asistentes:', error);
    });

  actionButton.addEventListener('click', handleAttendance);

  eventDiv.appendChild(actionButton);

  return eventDiv;
};
