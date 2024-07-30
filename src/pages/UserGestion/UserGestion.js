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
    <div id="search-container">
      <input type="text" id="search-input" placeholder="Buscar por nombre..." />
    </div>
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
  const searchInput = div.querySelector('#search-input');
  const defaultProfileImageUrl = '/icons8-usuario-48.png';
  let allUsers = [];

  const renderUsers = async (searchTerm = '') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró un token de autenticación');
      }

      const users = await fetchUsers(token);
      allUsers = users;

      // Filtro por userName
      const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      userListTableBody.innerHTML = '';

      filteredUsers.forEach((user) => {
        const profileImageUrl = user.profileImageUrl
          ? user.profileImageUrl
          : defaultProfileImageUrl;

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
                userRow.remove();
                detailsRow.remove();
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
        detailsRow.style.display = 'none';

        userListTableBody.appendChild(detailsRow);

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

  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    renderUsers(searchTerm);
  });

  renderUsers();
};
