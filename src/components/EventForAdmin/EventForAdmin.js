import './EventForAdmin.css';

export const EventForAdmin = (event) => {
  console.log('Datos del evento:', event);
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event-admin');
  eventDiv.id = `event-${event._id}`;
  console.log(`ID del evento en EventForAdmin: ${event._id}`);

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

  if (event.createdBy && event.createdBy.userName) {
    const createdBy = document.createElement('p');
    createdBy.textContent = `Creado por: ${event.createdBy.userName}`;
    eventDiv.appendChild(createdBy);
  } else {
    console.log(
      'El creador no está disponible o el nombre de usuario es inválido.'
    );
  }

  const date = document.createElement('p');
  date.textContent = `Fecha: ${new Date(event.date).toLocaleDateString()}`;
  eventDiv.appendChild(date);

  return eventDiv;
};
