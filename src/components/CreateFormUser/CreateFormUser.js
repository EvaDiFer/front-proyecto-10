// utils/components/FormUser.js
export const createFormUser = (onSubmit) => {
  // Crear el formulario
  const form = document.createElement('form');
  form.id = 'updateProfileForm';
  form.className = 'profile-form'; // Puedes añadir una clase CSS si lo deseas
  form.onsubmit = onSubmit;

  // Crear y agregar los elementos del formulario
  const userNameLabel = document.createElement('label');
  userNameLabel.setAttribute('for', 'userName');
  userNameLabel.textContent = 'Nombre de Usuario:';
  const userNameInput = document.createElement('input');
  userNameInput.type = 'text';
  userNameInput.id = 'userName';
  userNameInput.name = 'userName';
  userNameInput.required = true;

  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.textContent = 'Correo Electrónico:';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.required = true;

  const currentPasswordLabel = document.createElement('label');
  currentPasswordLabel.setAttribute('for', 'currentPassword');
  currentPasswordLabel.textContent = 'Contraseña Actual:';
  const currentPasswordInput = document.createElement('input');
  currentPasswordInput.type = 'password';
  currentPasswordInput.id = 'currentPassword';
  currentPasswordInput.name = 'currentPassword';

  const newPasswordLabel = document.createElement('label');
  newPasswordLabel.setAttribute('for', 'newPassword');
  newPasswordLabel.textContent = 'Nueva Contraseña:';
  const newPasswordInput = document.createElement('input');
  newPasswordInput.type = 'password';
  newPasswordInput.id = 'newPassword';
  newPasswordInput.name = 'newPassword';

  const profileImageLabel = document.createElement('label');
  profileImageLabel.setAttribute('for', 'profileImageUrl');
  profileImageLabel.textContent = 'Imagen de Perfil:';
  const profileImageInput = document.createElement('input');
  profileImageInput.type = 'file';
  profileImageInput.id = 'profileImageUrl';
  profileImageInput.name = 'profileImageUrl';
  profileImageInput.accept = 'image/*';

  const profileImage = document.createElement('img');
  profileImage.id = 'currentProfileImage';
  profileImage.alt = 'Imagen de Perfil';
  profileImage.style.borderRadius = '50%';
  profileImage.style.display = 'none'; // Inicialmente oculto

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Actualizar Perfil';

  // Añadir los elementos al formulario
  form.appendChild(userNameLabel);
  form.appendChild(userNameInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(currentPasswordLabel);
  form.appendChild(currentPasswordInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(newPasswordLabel);
  form.appendChild(newPasswordInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(profileImageLabel);
  form.appendChild(profileImageInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(profileImage);
  form.appendChild(document.createElement('br'));
  form.appendChild(submitButton);

  return form;
};
