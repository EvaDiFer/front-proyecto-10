export const BASE_URL = 'https://back-proyecto-10.vercel.app ';

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
    finalBody = body;
    for (const key in body) {
      finalBody.append(key, body[key]);
    }
  } else {
    finalBody = isJSON ? JSON.stringify(body) : body;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: finalBody,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error ${res.status}: ${error}`);
    }

    const response = await res.json();
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
