export const CreateFormUser = (defaultProfileImageUrl, updateProfile) => {
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

  return form;
};
