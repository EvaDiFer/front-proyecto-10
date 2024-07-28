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

  // Crear el formulario
  const form = document.createElement('form');
  form.classList.add('event-form');

  // Crear los elementos del formulario
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

  // Obtener el ID del creador del local storage
  const creatorId = localStorage.getItem('userId');
  const creatorInput = document.createElement('input');
  creatorInput.type = 'hidden'; // Oculto para el usuario
  creatorInput.name = 'createdBy';
  creatorInput.value = creatorId;
  form.appendChild(creatorInput);

  // Crear el botón de enviar usando el componente Button
  const submitButton = Button({
    text: 'Crear Evento',
    fnc: (event) => {
      event.preventDefault();
      handleSubmit();
    },
    className: 'submit-button',
  });
  form.appendChild(submitButton);

  // Crear el botón de cancelar usando el componente Button (inicialmente no se muestra)
  const cancelButton = Button({
    text: 'Cancelar',
    fnc: (event) => {
      event.preventDefault();
      resetForm();
    },
    className: 'cancel-button',
  });
  cancelButton.style.display = 'none'; // Ocultar inicialmente
  form.appendChild(cancelButton);

  // Crear un elemento para el mensaje de archivo
  const fileMessage = document.createElement('p');
  fileMessage.textContent =
    'Seleccione una nueva imagen solo si desea actualizar la existente.';
  fileMessage.style.display = 'none'; // Ocultarlo inicialmente
  form.appendChild(fileMessage);

  // Agregar formulario al contenedor principal
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
    cancelButton.style.display = 'none'; // Ocultar el botón de cancelar
    isEditing = false;
    editingEventId = null;
  };

  const loadEvents = async () => {
    try {
      const response = await fetchEvents(token);

      div.innerHTML = '';
      div.appendChild(form); // Reagregar el formulario al contenedor

      response.forEach((event) => {
        const eventComponent = EventForAdmin(event);

        // Botón para eliminar evento usando el componente Button
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

        // Botón para editar evento usando el componente Button
        const editButton = Button({
          text: 'Editar evento',
          fnc: () => {
            // Llenar el formulario con los datos del evento
            titleInput.value = event.title;
            descriptionInput.value = event.description;
            dateInput.value = event.date.split('T')[0];
            imageInput.value = ''; // Resetear el campo de archivo

            // Configurar el formulario para la edición
            isEditing = true;
            editingEventId = event._id;
            submitButton.textContent = 'Actualizar Evento';

            // Mostrar el mensaje de selección de archivo y el botón de cancelar
            fileMessage.style.display = 'block';
            cancelButton.style.display = 'inline'; // Mostrar el botón de cancelar
          },
          className: 'edit-button',
        });
        eventComponent.appendChild(editButton);

        div.appendChild(eventComponent);
      });
    } catch (error) {
      console.error('Error al obtener eventos:', error.message);
    }
  };

  await loadEvents();
};
