import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import './Attendee.css';

export const Attendee = async () => {
  try {
    const container = renderPage('attendee');

    const events = await fetchRequest({
      endpoint: '/events',
      method: 'GET',
    });

    const eventDetails = events.map((event) => ({
      title: event.title,
      attendants: event.attendants.map((attendant) => attendant.userName),
    }));

    const eventsList = document.createElement('div');
    eventsList.className = 'events-list';

    eventDetails.forEach((event) => {
      const eventElement = document.createElement('div');
      eventElement.className = 'event-item';
      eventElement.innerHTML = `
        <h2>${event.title}</h2>
        <p>Asistentes: ${event.attendants.join(', ')}</p>
      `;
      eventsList.appendChild(eventElement);
    });

    container.appendChild(eventsList);

    return container;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};
