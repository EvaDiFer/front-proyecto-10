import { fetchRequest } from '../API/fetch';

export const createEvent = async (formData, token) => {
  return await fetchRequest({
    endpoint: '/events',
    method: 'POST',
    body: formData,
    token: token,
    isFile: true,
  });
};

export const fetchEvents = async (token) => {
  return await fetchRequest({
    endpoint: '/events',
    token: token,
  });
};

export const deleteEventRequest = async (eventId, token) => {
  return await fetchRequest({
    endpoint: `/events/${eventId}`,
    method: 'DELETE',
    token: token,
  });
};

// Nueva función para actualizar un evento
export const updateEventRequest = async (eventId, formData, token) => {
  return await fetchRequest({
    endpoint: `/events/${eventId}`,
    method: 'PUT',
    body: formData,
    token: token,
    isFile: true,
  });
};
