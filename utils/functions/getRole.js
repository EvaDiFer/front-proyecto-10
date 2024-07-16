export const getRole = () => {
  // Obtener el rol del usuario del localStorage
  const userRole = localStorage.getItem('role');

  // Si no hay un rol guardado, devolver un valor predeterminado (por ejemplo, 'guest')
  return userRole || 'guest';
};
