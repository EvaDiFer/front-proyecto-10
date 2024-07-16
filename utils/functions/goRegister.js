import { fetchRequest } from '../API/fetch';

export const goRegister = async (e) => {
  e.preventDefault();

  const [userNameInput, passwordInput, emailInput] = e.target;

  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  const response = await fetchRequest({
    endpoint: '/users/register',
    body,
    method: 'POST',
  });

  localStorage.setItem('token', response.token);
};
