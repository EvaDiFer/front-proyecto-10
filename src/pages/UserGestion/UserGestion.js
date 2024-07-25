import {
  deleteUserRequest,
  fetchUsers,
} from '../../../utils/functions/fetchForAdminUsersGestion';
import { renderPage } from '../../../utils/functions/renderPage';
import { Button } from '../../components/Button/Button';

import './UserGestion.css';

export const UserGestion = () => {
  const div = renderPage('user-gestion');
  div.innerHTML = `
    <h2>Gestión de Usuarios</h2>
    <div id="user-list">
      <table id="user-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

  const userListTableBody = div.querySelector('#user-table tbody');
  const defaultProfileImageUrl = '/icons8-usuario-48.png'; // Asegúrate de que esta ruta sea correcta

  const renderUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      if (!token) {
        throw new Error('No se encontró un token de autenticación');
      }

      const users = await fetchUsers(token);
      userListTableBody.innerHTML = ''; // Limpiar la tabla de usuarios antes de renderizar

      users.forEach((user) => {
        const profileImageUrl = user.profileImageUrl
          ? user.profileImageUrl
          : defaultProfileImageUrl; // Usar operador ternario para la imagen de perfil

        const userRow = document.createElement('tr');
        userRow.className = 'user-item';

        const viewDetailsButton = Button({
          text: 'Ver Detalles',
          fnc: () => toggleDetails(userRow, detailsRow),
          className: 'toggle-details-btn',
        });

        const deleteButton = Button({
          text: 'Eliminar',
          fnc: async () => {
            const confirmDelete = confirm(
              `¿Estás seguro de que deseas eliminar a ${user.userName}?`
            );
            if (confirmDelete) {
              try {
                await deleteUserRequest(user._id, token);
                userRow.remove(); // Eliminar la fila del DOM después de eliminar
                detailsRow.remove(); // Eliminar la fila de detalles correspondiente
              } catch (error) {
                console.error('Error al eliminar el usuario:', error);
              }
            }
          },
          className: 'delete-btn',
        });

        userRow.innerHTML = `
          <td><img src="${profileImageUrl}" alt="Profile Image" class="user-image"></td>
          <td>${user.userName}</td>
          <td>${user.rol}</td>
          <td></td>
        `;

        userListTableBody.appendChild(userRow);

        // Detalles adicionales
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'user-details';
        detailsRow.innerHTML = `
          <td colspan="4">
            <div class="user-details-content">
              <p>Email: ${user.email}</p>
              <p>Eventos Asistidos: ${user.attendingEvents
                .map((event) => event.title)
                .join(', ')}</p>
            </div>
          </td>
        `;
        detailsRow.style.display = 'none'; // Ocultar los detalles inicialmente

        userListTableBody.appendChild(detailsRow);

        // Agregar los botones a la fila de usuario
        const actionsCell = userRow.querySelector('td:nth-child(4)');
        actionsCell.appendChild(viewDetailsButton);
        actionsCell.appendChild(deleteButton);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      userListTableBody.innerHTML =
        '<tr><td colspan="4">Error al cargar la lista de usuarios</td></tr>';
    }
  };

  const toggleDetails = (userRow, detailsRow) => {
    const isDetailsVisible = detailsRow.style.display === 'table-row';
    detailsRow.style.display = isDetailsVisible ? 'none' : 'table-row';
  };

  renderUsers();
};
