import './FormComponent.css';

export const FormComponent = ({
  labelText,
  type = 'text',
  required = true,
}) => {
  return `<div class="field-form">
              <label>${labelText}</label>
              <input type="${type}" required="${required}" />
          </div>`;
};
