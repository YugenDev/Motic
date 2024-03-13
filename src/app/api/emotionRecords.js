// api/emotionRecords.js

const API_URL = 'https://fictional-carnival-r4ggwppp69rpfqq5-8000.app.github.dev'; // URL de tu API

export const createEmotionRecord = async (data) => {
  try {
    const userId = localStorage.getItem('userId'); // Obtener la ID del usuario del localStorage
    if (!userId) {
      throw new Error('ID de usuario no encontrada en el localStorage');
    }

    const response = await fetch(`${API_URL}/registros-emocionales/registros-emocionales/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear el registro emocional');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmotionRecords = async () => {
  try {
    const userId = localStorage.getItem('userId'); // Obtener la ID del usuario del localStorage
    if (!userId) {
      throw new Error('ID de usuario no encontrada en el localStorage');
    }

    const response = await fetch(`${API_URL}/registros-emocionales/registros-emocionales/usuario/${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener los registros emocionales');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};