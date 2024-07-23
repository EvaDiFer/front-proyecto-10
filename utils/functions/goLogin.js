import { fetchRequest } from '../API/fetch';
import { RenderLinks } from './renderLinks';

export const goLogin = async (e) => {
  e.preventDefault();
  const [userNameInput, passwordInput] = e.target;
  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };

  console.log('Cuerpo de la solicitud:', body);

  try {
    const res = await fetchRequest({
      endpoint: '/users/login',
      body,
      method: 'POST',
    });

    console.log('Respuesta de la API:', res);

    if (res && res.token && res.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol', res.user.rol);
      localStorage.setItem('userId', res.user._id);

      RenderLinks();
      return true; // Indicar que la autenticación fue exitosa
    } else {
      let errorMessage = 'Error de autenticación.';
      if (res.error) {
        errorMessage = res.error;
      } else {
        errorMessage = 'Error desconocido.';
      }
      throw new Error(errorMessage); // Lanzar una excepción en caso de error
    }
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    throw new Error(error.message || 'Error de autenticación.'); // Lanzar una excepción en caso de error
  }
};
