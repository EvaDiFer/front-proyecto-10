import { cancelAttendance } from '../../../utils/functions/cancelAttendance';
import { confirmAttendance } from '../../../utils/functions/confirmAttendance';

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
    if (event.createdBy && event.createdBy.userName) {
      createdBy.textContent = `Creado por: ${event.createdBy.userName}`;
    } else {
      createdBy.textContent = `Creado por: Información no disponible`;
    }
    eventDiv.appendChild(createdBy);
  }

  // Verificar el estado de asistencia en localStorage
  const storedAttendanceStatus = localStorage.getItem(
    `attendance-${event._id}`
  );
  const isAttendanceConfirmed = storedAttendanceStatus === 'confirmed';

  // Creando el botón para cancelar asistencia o confirmar asistencia
  const actionButton = document.createElement('button');

  // Configurar el texto y el estado del botón basado en el estado de la página y la asistencia
  if (isConfirmedPage) {
    // En la página de eventos confirmados, siempre mostrar "Cancelar Asistencia"
    actionButton.textContent = isAttendanceConfirmed
      ? 'Cancelar Asistencia'
      : 'No Confirmado';
    if (isAttendanceConfirmed) {
      actionButton.disabled = false;
    } else {
      actionButton.disabled = true;
    }
  } else {
    // En la página de eventos normales, mostrar el texto del botón por defecto
    actionButton.textContent = isAttendanceConfirmed
      ? 'Asistencia Confirmada'
      : buttonText;
    actionButton.disabled = isAttendanceConfirmed;
  }

  actionButton.addEventListener('click', async () => {
    if (isConfirmedPage) {
      if (isAttendanceConfirmed) {
        // En la página de eventos confirmados, cancelar la asistencia
        await cancelAttendance(event._id);
        localStorage.setItem(`attendance-${event._id}`, 'cancelled');
        actionButton.textContent = 'Asistencia Cancelada';
        actionButton.disabled = true;
        eventDiv.remove();
      }
    } else {
      if (isAttendanceConfirmed) {
        // Si la asistencia ya está confirmada, no hace nada
        return;
      } else if (actionButton.textContent === 'Confirmar Asistencia') {
        // Confirmar asistencia en la página de eventos normales
        await confirmAttendance(event._id);
        localStorage.setItem(`attendance-${event._id}`, 'confirmed');
        actionButton.textContent = 'Asistencia Confirmada';
        actionButton.disabled = true;
      }
    }
  });

  eventDiv.appendChild(actionButton);

  return eventDiv;
};
