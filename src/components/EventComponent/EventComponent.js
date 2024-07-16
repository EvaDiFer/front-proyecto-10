import { Button } from '../Button/Button';

export const createEventComponent = (event) => {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');

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

  const createdBy = document.createElement('p');
  createdBy.textContent = `Creado por: ${event.createdBy.userName}`;
  eventDiv.appendChild(createdBy);

  const confirmButton = Button({
    text: 'Confirmar asistencia',
    fnc: () => {
      confirmButton.style.display = 'none';
      cancelButton.style.display = 'block';
    },
    className: 'confirm-button',
  });
  eventDiv.appendChild(confirmButton);

  const cancelButton = Button({
    text: 'Cancelar asistencia',
    fnc: () => {
      cancelButton.style.display = 'none';
      confirmButton.style.display = 'block';
    },
    className: 'cancel-button',
  });
  cancelButton.style.display = 'none';
  eventDiv.appendChild(cancelButton);

  return eventDiv;
};
