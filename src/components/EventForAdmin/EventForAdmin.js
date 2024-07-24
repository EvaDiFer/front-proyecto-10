// EventForAdmin.js
export const EventForAdmin = (event) => {
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

  if (event.createdBy && event.createdBy.userName) {
    const createdBy = document.createElement('p');
    createdBy.textContent = `Creado por: ${event.createdBy.userName}`;
    eventDiv.appendChild(createdBy);
  }

  // Crear y añadir la imagen si existe
  if (event.imageUrl) {
    const image = document.createElement('img');
    image.src = event.imageUrl;
    image.alt = `Imagen para ${event.title}`;
    eventDiv.appendChild(image);
  }

  // Crear y añadir la fecha
  const date = document.createElement('p');
  date.textContent = `Fecha: ${new Date(event.date).toLocaleDateString()}`;
  eventDiv.appendChild(date);

  return eventDiv;
};
