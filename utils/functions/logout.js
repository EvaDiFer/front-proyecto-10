export const Logout = () => {
  alert('¡Hasta la próxima!');

  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('userId');

  window.location.href = '/';
};
