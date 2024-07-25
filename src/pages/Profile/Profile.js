import { fetchRequest } from '../../../utils/API/fetch';
import { renderPage } from '../../../utils/functions/renderPage';
import { CreateFormUser } from '../../components/CreateFormUser/CreateFormUser';

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
      const result = await fetchRequest({
        endpoint: `/users/${userId}`,
        method: 'PUT',
        body: formData,
        token: token,
        isFile: true,
      });

      alert('Perfil actualizado con éxito');
      await getUserData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const form = CreateFormUser(defaultProfileImageUrl, updateProfile);
  div.appendChild(form);

  const getUserData = async () => {
    try {
      const userData = await fetchRequest({
        endpoint: `/users/${userId}`,
        method: 'GET',
        token: token,
      });

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
