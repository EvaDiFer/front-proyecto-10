export const BASE_URL = 'http://localhost:3000/api/v1';

export const fetchRequest = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null,
  isFile = false,
}) => {
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (isJSON && !isFile) {
    headers['Content-Type'] = 'application/json';
  }

  let finalBody;
  if (isFile) {
    // Si es un archivo, usamos FormData
    finalBody = new FormData();
    for (const key in body) {
      finalBody.append(key, body[key]);
    }
  } else {
    // Si no, usamos JSON (o texto plano si isJSON es false)
    finalBody = isJSON ? JSON.stringify(body) : body;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: finalBody,
    });

    if (!res.ok) {
      // Manejo de errores HTTP
      const error = await res.text();
      throw new Error(`Error ${res.status}: ${error}`);
    }

    // Asumimos que la respuesta es JSON
    const response = await res.json();
    return response;
  } catch (error) {
    // Manejo de errores de red o parsing
    console.error('Error fetching data:', error);
    throw error;
  }
};
