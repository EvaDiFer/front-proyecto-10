import { fetchRequest } from '../API/fetch';
import { RenderLinks } from './renderLinks';

export const goRegister = async (e) => {
  e.preventDefault();

  const [userNameInput, passwordInput, emailInput] = e.target.elements;

  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  try {
    const response = await fetchRequest({
      endpoint: '/users/register',
      body,
      method: 'POST',
    });

    console.log('Respuesta del servidor:', response);

    if (response.user && response.token) {
      localStorage.setItem('rol', response.user.rol);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user._id);

      RenderLinks();
      return true; // Registro exitoso
    } else {
      console.error('La respuesta no contiene el usuario o el token.');
      return false; // Registro fallido
    }
  } catch (error) {
    console.error('Error en la solicitud de registro:', error);
    return false; // Error en la solicitud
  }
};
