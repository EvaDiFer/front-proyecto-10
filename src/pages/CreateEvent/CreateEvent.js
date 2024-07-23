import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import './CreateEvent.css';

export const CreateEvent = async () => {
  const div = renderPage('create-event');
  const token = localStorage.getItem('token');

  // Añadir título
  const heading = document.createElement('h1');
  heading.textContent = 'Estos son todos los eventos creados';
  div.appendChild(heading);

  // Crear y añadir el formulario para agregar eventos
  const form = document.createElement('form');
  form.classList.add('event-form');

  // Título del evento
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
  imageInput.name = 'image';
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

  // Añadir el formulario al contenedor
  div.appendChild(form);

  // Función para manejar el envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      // Realizar la solicitud POST para crear el nuevo evento
      await fetchRequest({
        endpoint: '/events',
        method: 'POST',
        body: formData,
        token: token, // Añadir el token a las cabeceras
      });

      // Limpiar el formulario
      form.reset();

      // Actualizar la lista de eventos
      await loadEvents();
    } catch (error) {
      console.error('Error al crear el evento:', error.message);
    }
  });

  // Función para cargar eventos
  const loadEvents = async () => {
    try {
      const response = await fetchRequest({
        endpoint: '/events',
        token: token, // Añadir el token a las cabeceras
      });

      // Limpia el contenedor antes de agregar los eventos
      div.innerHTML = '';
      div.appendChild(form); // Reagregar el formulario al contenedor

      response.forEach((event) => {
        // Crear un contenedor para cada evento
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.id = `event-${event._id}`;

        // Crear y añadir el título
        const title = document.createElement('h2');
        title.textContent = event.title;
        eventDiv.appendChild(title);

        // Crear y añadir la descripción
        const description = document.createElement('p');
        description.textContent = event.description;
        eventDiv.appendChild(description);

        // const createdBy = document.createElement('p');
        // createdBy.textContent = `Creado por: ${event.createdBy.userName}`;
        // eventDiv.appendChild(createdBy);

        // Crear y añadir la imagen si existe
        if (event.imageUrl) {
          const image = document.createElement('img');
          image.src = event.imageUrl;
          image.alt = `Imagen para ${event.title}`;
          eventDiv.appendChild(image);
        }

        // Crear y añadir la fecha
        const date = document.createElement('p');
        date.textContent = `Fecha: ${new Date(
          event.date
        ).toLocaleDateString()}`;
        eventDiv.appendChild(date);

        // Añadir el contenedor del evento al div principal
        div.appendChild(eventDiv);
      });
    } catch (error) {
      console.error('Error al obtener eventos:', error.message);
    }
  };

  // Cargar eventos al inicializar el componente
  await loadEvents();
};
