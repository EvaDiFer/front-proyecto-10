import { fetchRequest } from '../API/fetch';

export const fetchUsers = async (token) => {
  try {
    const response = await fetchRequest({
      endpoint: '/users',
      method: 'GET',
      token,
    });
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
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
