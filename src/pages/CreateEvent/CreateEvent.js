import {
  createEvent,
  deleteEventRequest,
  fetchEvents,
  updateEventRequest,
} from '../../../utils/functions/fetchForAdminEvents';
import { renderPage } from '../../../utils/functions/renderPage';
import { Button } from '../../components/Button/Button';
import { EventForAdmin } from '../../components/EventForAdmin/EventForAdmin';

import './CreateEvent.css';

export const CreateEvent = async () => {
  const div = renderPage('create-event');
  const token = localStorage.getItem('token');

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.display = 'none';
  div.appendChild(spinner);

  const form = document.createElement('form');
  form.classList.add('event-form');

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Título del evento';
  titleInput.name = 'title';
  form.appendChild(titleInput);

  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Descripción del evento';
  descriptionInput.name = 'description';
  form.appendChild(descriptionInput);

  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*';
  imageInput.name = 'imageUrl';
  form.appendChild(imageInput);

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'date';
  form.appendChild(dateInput);

  const creatorId = localStorage.getItem('userId');
  const creatorInput = document.createElement('input');
  creatorInput.type = 'hidden';
  creatorInput.name = 'createdBy';
  creatorInput.value = creatorId;
  form.appendChild(creatorInput);

  const submitButton = Button({
    text: 'Crear Evento',
    fnc: (event) => {
      event.preventDefault();
      handleSubmit();
    },
    className: 'submit-button',
  });
  form.appendChild(submitButton);

  const cancelButton = Button({
    text: 'Cancelar',
    fnc: (event) => {
      event.preventDefault();
      resetForm();
    },
    className: 'cancel-button',
  });
  cancelButton.style.display = 'none';
  form.appendChild(cancelButton);

  const fileMessage = document.createElement('p');
  fileMessage.textContent =
    'Seleccione una nueva imagen solo si desea actualizar la existente.';
  fileMessage.style.display = 'none';
  form.appendChild(fileMessage);

  div.appendChild(form);

  let isEditing = false;
  let editingEventId = null;

  const handleSubmit = async () => {
    const formData = new FormData(form);

    try {
      if (isEditing) {
        await updateEventRequest(editingEventId, formData, token);
        alert('Evento actualizado con éxito!');
        resetForm();
      } else {
        await createEvent(formData, token);
        alert('Evento creado con éxito!');
        form.reset();
      }

      await loadEvents();
    } catch (error) {
      console.error('Error al crear/actualizar el evento:', error.message);
      alert('Error al crear/actualizar el evento: ' + error.message);
    }
  };

  const resetForm = () => {
    form.reset();
    submitButton.textContent = 'Crear Evento';
    fileMessage.style.display = 'none';
    cancelButton.style.display = 'none';
    isEditing = false;
    editingEventId = null;
  };

  const loadEvents = async () => {
    try {
      spinner.style.display = 'block';

      const response = await fetchEvents(token);

      div.innerHTML = '';
      div.appendChild(form);

      response.forEach((event) => {
        const eventComponent = EventForAdmin(event);

        const deleteButton = Button({
          text: 'Eliminar evento',
          fnc: async () => {
            const userConfirmed = confirm(
              '¿Estás seguro de que quieres eliminar este evento?'
            );
            if (userConfirmed) {
              try {
                await deleteEventRequest(event._id, token);
                alert('Evento eliminado con éxito!');
                await loadEvents();
              } catch (error) {
                console.error('Error al eliminar el evento:', error.message);
                alert('Error al eliminar el evento: ' + error.message);
              }
            }
          },
          className: 'delete-button',
        });
        eventComponent.appendChild(deleteButton);

        const editButton = Button({
          text: 'Editar evento',
          fnc: () => {
            titleInput.value = event.title;
            descriptionInput.value = event.description;
            dateInput.value = event.date.split('T')[0];
            imageInput.value = '';

            isEditing = true;
            editingEventId = event._id;
            submitButton.textContent = 'Actualizar Evento';

            fileMessage.style.display = 'block';
            cancelButton.style.display = 'inline';
          },
          className: 'edit-button',
        });
        eventComponent.appendChild(editButton);

        div.appendChild(eventComponent);
      });
    } catch (error) {
      console.error('Error al obtener eventos:', error.message);
    } finally {
      spinner.style.display = 'none';
    }
  };

  await loadEvents();
};
