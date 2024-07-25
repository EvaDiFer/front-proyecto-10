import { renderPage } from '../../../utils/functions/renderPage';

export const Profile = async () => {
  const div = renderPage('perfil');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    alert('ID de usuario o token no encontrados en localStorage');
    return;
  }

  const defaultProfileImageUrl = '/public/icons8-usuario-48.png';

  const updateProfile = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error en la actualización');
      }

      alert('Perfil actualizado con éxito');
      await getUserData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const form = document.createElement('form');
  form.id = 'updateProfileForm';
  form.onsubmit = updateProfile;

  form.innerHTML = `
    <label for="userName">Nombre de Usuario:</label>
    <input type="text" id="userName" name="userName" required>
    <br>
    <label for="email">Correo Electrónico:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <label for="currentPassword">Contraseña Actual:</label>
    <input type="password" id="currentPassword" name="currentPassword">
    <br>
    <label for="newPassword">Nueva Contraseña:</label>
    <input type="password" id="newPassword" name="newPassword">
    <br>
    <label for="profileImageUrl">Imagen de Perfil:</label>
    <input type="file" id="profileImageUrl" name="profileImageUrl" accept="image/*">
    <br>
    <img id="currentProfileImage" src="${defaultProfileImageUrl}" alt="Imagen de Perfil" style="display:block; width:100px; height:100px;">
    <br>
    <button type="submit">Actualizar Perfil</button>
  `;

  div.appendChild(form);

  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }

      const userData = await response.json();

      document.getElementById('userName').value = userData.userName;
      document.getElementById('email').value = userData.email;

      const profileImage = document.getElementById('currentProfileImage');
      if (userData.profileImageUrl) {
        profileImage.src = userData.profileImageUrl;
      } else {
        profileImage.src = defaultProfileImageUrl;
      }
      profileImage.style.display = 'block';
    } catch (error) {
      console.error('Error:', error);
      alert('Error al obtener los datos del usuario');
    }
  };

  getUserData();

  document
    .getElementById('profileImageUrl')
    .addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const profileImage = document.getElementById('currentProfileImage');
          profileImage.src = e.target.result;
          profileImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
};
