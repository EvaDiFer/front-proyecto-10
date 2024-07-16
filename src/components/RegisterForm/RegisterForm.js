import { Button } from '../Button/Button';
import { FormComponent } from '../FormComponent/FormComponent';
import './RegisterForm.css';

export const RegisterForm = (form) => {
  form.className = 'register-form';

  form.innerHTML = `
        ${FormComponent({ labelText: 'userName' })}
        ${FormComponent({ labelText: 'Contraseña', type: 'password' })}
        ${FormComponent({ labelText: 'Email', type: 'email' })}
        
    `;

  form.append(Button({ text: 'Registrarse' }));
};
