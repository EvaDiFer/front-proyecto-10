import { fetchRequest } from '../API/fetch';

export const getUserData = async (userId, token) => {
  return await fetchRequest({
    endpoint: `/users/${userId}`,
    method: 'GET',
    token,
  });
};

export const updateUserData = async (userId, formData, token) => {
  return await fetchRequest({
    endpoint: `/users/${userId}`,
    method: 'PUT',
    body: formData,
    isFile: true,
    token,
  });
};
