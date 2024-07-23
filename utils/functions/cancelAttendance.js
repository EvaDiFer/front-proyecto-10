import { fetchRequest } from '../API/fetch';

export const cancelAttendance = async (eventId) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId) {
    console.error('No se encontró el ID del usuario en el localStorage');
    return;
  }

  try {
    const response = await fetchRequest({
      endpoint: `/events/${eventId}/attendants`,
      method: 'DELETE',
      body: { userId },
      token,
      isJSON: true,
    });

    console.log('Asistencia cancelada exitosamente:', response.message);
    alert('Asistencia cancelada exitosamente.');
  } catch (error) {
    console.error('Error al cancelar asistencia:', error.message);
  }
};
