import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import { EventForAdmin } from '../../components/EventForAdmin/EventForAdmin';
import './CreateEvent.css';

export const CreateEvent = async () => {
  const div = renderPage('create-event');
  const token = localStorage.getItem('token');

  const heading = document.createElement('h1');
  heading.textContent = 'Estos son todos los eventos creados';
  div.appendChild(heading);

  const form = document.createElement('form');
  form.classList.add('event-form');

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Título del evento';
  titleInput.name = 'title';
  form.appendChild(titleInput);

  // Descripción del evento
  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Descripción del evento';
  descriptionInput.name = 'description';
  form.appendChild(descriptionInput);

  // URL de la imagen del evento (cambiado a input tipo file)
  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*'; // Aceptar solo imágenes
  imageInput.name = 'imageUrl'; // Asegúrate de que esto coincida con el backend
  form.appendChild(imageInput);

  // Fecha del evento
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'date';
  form.appendChild(dateInput);

  // Botón de envío
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Crear Evento';
  form.appendChild(submitButton);

  // Crear un contenedor para el mensaje de éxito
  const successMessage = document.createElement('div');
  successMessage.id = 'successMessage';
  successMessage.style.display = 'none'; // Ocultar inicialmente
  successMessage.style.color = 'green';
  div.appendChild(successMessage);

  // Añadir el formulario al contenedor
  div.appendChild(form);

  // Función para manejar el envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    console.log('Form Data Entries:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      // Realizar la solicitud POST para crear el nuevo evento
      await fetchRequest({
        endpoint: '/events',
        method: 'POST',
        body: formData,
        token: token,
        isFile: true,
      });

      // Limpiar el formulario
      form.reset();

      // Mostrar mensaje de éxito
      const successElement = document.getElementById('successMessage');
      if (successElement) {
        successElement.textContent = 'Evento creado con éxito!';
        successElement.style.display = 'block';
      }

      // Actualizar la lista de eventos
      await loadEvents();
    } catch (error) {
      console.error('Error al crear el evento:', error.message);

      // Mostrar mensaje de error
      const successElement = document.getElementById('successMessage');
      if (successElement) {
        successElement.textContent =
          'Error al crear el evento: ' + error.message;
        successElement.style.color = 'red'; // Cambiar color para indicar error
        successElement.style.display = 'block';
      }
    }
  });

  const loadEvents = async () => {
    try {
      const response = await fetchRequest({
        endpoint: '/events',
        token: token,
      });

      // Limpia el contenedor antes de agregar los eventos
      div.innerHTML = '';
      div.appendChild(form); // Reagregar el formulario al contenedor

      response.forEach((event) => {
        const eventComponent = EventForAdmin(event);
        div.appendChild(eventComponent);
      });
    } catch (error) {
      console.error('Error al obtener eventos:', error.message);
    }
  };

  await loadEvents();
};
