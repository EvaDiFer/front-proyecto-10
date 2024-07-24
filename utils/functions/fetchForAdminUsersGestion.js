import { fetchRequest } from '../API/fetch'; // Asegúrate de que esta ruta sea correcta

export const fetchUsers = async (token) => {
  try {
    const response = await fetchRequest({
      endpoint: '/users', // Ajusta el endpoint según tu API
      method: 'GET',
      token,
    });
    return response; // Debería devolver la lista de usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Propaga el error para que pueda ser manejado en la llamada de función
  }
};

export const deleteUserRequest = async (userId, token) => {
  try {
    await fetchRequest({
      endpoint: `/users/${userId}`,
      method: 'DELETE',
      token,
    });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw new Error('No se pudo eliminar el usuario');
  }
};
