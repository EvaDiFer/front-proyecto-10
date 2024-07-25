import { cancelAttendance } from '../../../utils/functions/cancelAttendance';
import { confirmAttendance } from '../../../utils/functions/confirmAttendance';

const getCurrentUserId = () => {
  // Esta función debe devolver el ID del usuario actual. Ejemplo:
  return localStorage.getItem('userId') || 'defaultUserId';
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

  const title = document.createElement('h2');
  title.textContent = event.title;
  eventDiv.appendChild(title);

  const description = document.createElement('p');
  description.textContent = event.description;
  eventDiv.appendChild(description);

  if (event.imageUrl) {
    const image = document.createElement('img');
    image.src = event.imageUrl;
    image.alt = `Imagen para ${event.title}`;
    eventDiv.appendChild(image);
  }

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

  const userId = getCurrentUserId(); // Obtener el ID del usuario actual
  const storageKey = `attendance-${event._id}-${userId}`; // Usar el ID del usuario en la clave del localStorage
  const storedAttendanceStatus = localStorage.getItem(storageKey);
  const isAttendanceConfirmed = storedAttendanceStatus === 'confirmed';

  const actionButton = document.createElement('button');

  if (isConfirmedPage) {
    actionButton.textContent = isAttendanceConfirmed
      ? 'Cancelar Asistencia'
      : 'No Confirmado';
    actionButton.disabled = !isAttendanceConfirmed;
  } else {
    actionButton.textContent = isAttendanceConfirmed
      ? 'Asistencia Confirmada'
      : buttonText;
    actionButton.disabled = isAttendanceConfirmed;
  }

  actionButton.addEventListener('click', async () => {
    if (isConfirmedPage) {
      if (isAttendanceConfirmed) {
        // Cancelar la asistencia
        await cancelAttendance(event._id, userId);
        localStorage.removeItem(storageKey);
        actionButton.textContent = 'Asistencia Cancelada';
        actionButton.disabled = true;

        // Eliminar el evento del DOM
        eventDiv.remove();
      }
    } else {
      if (isAttendanceConfirmed) {
        // Asistencia ya confirmada, no hace nada
        return;
      } else if (actionButton.textContent === 'Confirmar Asistencia') {
        // Confirmar asistencia
        await confirmAttendance(event._id, userId);
        localStorage.setItem(storageKey, 'confirmed');
        actionButton.textContent = 'Asistencia Confirmada';
        actionButton.disabled = true;

        const confirmedEventsContainer =
          document.getElementById('confirmed-events');
        if (confirmedEventsContainer) {
          confirmedEventsContainer.appendChild(eventDiv);
        }
      }
    }
  });

  eventDiv.appendChild(actionButton);

  return eventDiv;
};
