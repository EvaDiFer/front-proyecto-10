export const Logout = () => {
  alert('¡Hasta la próxima!');

  localStorage.removeItem('token');
  localStorage.removeItem('rol');

  window.location.href = '/';
};
