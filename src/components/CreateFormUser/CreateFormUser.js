import { FormComponent } from '../FormComponent/FormComponent';

export const CreateFormUser = (defaultProfileImageUrl, updateProfile) => {
  const form = document.createElement('form');
  form.id = 'updateProfileForm';
  form.onsubmit = updateProfile;

  form.innerHTML = `
    ${FormComponent({
      labelText: 'Nombre de Usuario:',
      id: 'userName',
      name: 'userName',
    })}
    ${FormComponent({
      labelText: 'Correo Electrónico:',
      type: 'email',
      id: 'email',
      name: 'email',
    })}
    ${FormComponent({
      labelText: 'Contraseña Actual:',
      type: 'password',
      required: false,
      id: 'currentPassword',
      name: 'currentPassword',
    })}
    ${FormComponent({
      labelText: 'Nueva Contraseña:',
      type: 'password',
      required: false,
      id: 'newPassword',
      name: 'newPassword',
    })}
    <div class="field-form">
      <label for="profileImageUrl">Imagen de Perfil:</label>
      <input type="file" id="profileImageUrl" name="profileImageUrl" accept="image/*">
    </div>
    <br>
    <img id="currentProfileImage" src="${defaultProfileImageUrl}" alt="Imagen de Perfil" style="display:block; width:100px; height:100px;">
    <br>
    <button type="submit">Actualizar Perfil</button>
  `;

  return form;
};
