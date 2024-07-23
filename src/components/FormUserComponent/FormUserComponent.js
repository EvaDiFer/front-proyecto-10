import { FormComponent } from '../FormComponent/FormComponent';
import './FormUserComponent.css';

export const UserProfileForm = () => {
  // Genera el HTML del formulario
  const formHTML = `
    <form class="user-profile-form" enctype="multipart/form-data">
      ${FormComponent({ labelText: 'Nombre de Usuario', type: 'text' })}
      ${FormComponent({ labelText: 'Correo Electrónico', type: 'email' })}
      ${FormComponent({ labelText: 'Contraseña', type: 'password' })}
      <div class="field-form">
        <label for="profile-image">Imagen de Perfil</label>
        <input type="file" id="profile-image" name="profile-image" accept="image/*" />
      </div>
      <button type="submit" class="main-button">Actualizar Perfil</button> <!-- Botón HTML directo -->
    </form>
  `;
  return formHTML;
};
