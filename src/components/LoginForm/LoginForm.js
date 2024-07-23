import { Button } from '../Button/Button';
import { FormComponent } from '../FormComponent/FormComponent';
import './LoginForm.css';

export const LoginForm = (form) => {
  form.className = 'login-form';

  form.innerHTML = `
    ${FormComponent({ labelText: 'Nombre Usuario' })}
    ${FormComponent({ labelText: 'Contraseña', type: 'password' })}
`;

  form.append(Button({ text: 'Login' }));
};
