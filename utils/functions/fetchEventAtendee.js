import { fetchRequest } from '../API/fetch';

export const fetchEventAttendees = async (eventId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token no encontrado en localStorage');
  }

  return await fetchRequest({
    endpoint: `/events/${eventId}/attendees`,
    method: 'GET',
    token,
    isJSON: true,
  });
};
