import { fetchRequest } from '../API/fetch';

export const goLogin = async (e) => {
  e.preventDefault();

  const [userNameInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };

  try {
    const res = await fetchRequest({
      endpoint: '/users/login',
      body,
      method: 'POST',
    });

    // Registrar la respuesta para depurar
    console.log('Respuesta de la API:', res);

    if (res.token && res.user.rol) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol', res.user.rol);
    } else {
      console.error('La respuesta no contiene el token o el rol.');
    }
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
  }
};
