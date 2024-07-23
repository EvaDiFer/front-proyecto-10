import { fetchRequest } from '../API/fetch';

export const confirmAttendance = async (eventId) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId) {
    console.error('No se encontró el ID del usuario en el localStorage');
    return;
  }

  try {
    const response = await fetchRequest({
      endpoint: `/events/${eventId}/attendants`,
      method: 'POST',
      body: { userId },
      token,
      isJSON: true,
    });

    console.log('Asistencia añadida exitosamente:', response.message);
  } catch (error) {
    console.error('Error al añadir asistencia:', error.message);
  }
};
