"use client";

import 'tailwindcss/tailwind.css';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEmotionRecords } from "/workspaces/Motic/src/app/api/emotionRecords.js";
import moment from 'moment';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [emotionRecords, setEmotionRecords] = useState([]);

  const fetchEmotionRecords = async () => {
    try {
      const records = await getEmotionRecords();
      setEmotionRecords(records);
    } catch (error) {
      console.error('Error al obtener los registros emocionales:', error);
    }
  };

  const formatDate = (dateString) => {
    const formats = ['DD/MM/YYYY HH:mm', 'YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'];
    let formattedDate = dateString;
    for (const format of formats) {
      const parsedDate = moment(dateString, format, true);
      if (parsedDate.isValid()) {
        formattedDate = parsedDate.format('DD/MM/YYYY HH:mm');
        break;
      }
    }
    return formattedDate;
  };

  useEffect(() => {
    // Obtener el nombre del usuario del localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchEmotionRecords();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleLogout = () => {
    router.push('/login');
  };

  const handleNewRecord = () => {
    router.push('/dashboard/new-record');
  };

  return (
    <div className="backdrop-blur-sm min-h-screen flex flex-col bg-gradient-to-r from-pink-500 to-yellow-500 font-sans">
    <header className="bg-slate-950 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">Dashboard</h1>
        <div className="flex items-center">
          <p className="text-white mr-4 subpixel-antialiased font-bold tracking-wide italic">¡Bienvenido, {username}! </p>
          <button
            className="bg-red-500 bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text px-6 py-2 rounded mr-4"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
          <button
            className="bg-red-500 bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded mr-4 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
            onClick={handleNewRecord}
          >
            Nuevo Registro
          </button>
        </div>
      </div>
    </header>

    <main className="flex-1 container mx-auto mt-4 grid grid-cols-12 gap-4 lg:mx-8">
      <section className="col-span-4 bg-white p-4 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Resumen</h2>
        {/* Agrega aquí información resumida del usuario, estadísticas, etc. */}
      </section>

      <section className="col-span-8 bg-white p-4 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">Tus Registros</h2>
          {/* Mostrar los registros emocionales del usuario */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {emotionRecords.map(record => (
              <div key={record.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="text-gray-600">Fecha: {formatDate(record.fecha)}.</p>
                <p className="text-blue-600">Emoción: {record.emocion}</p>
                <p className="text-green-600">Color: {record.color}</p>
                <p className="text-gray-700">Comentario: {record.comentario}</p>
              </div>
            ))}
          </div>
        </section>
    </main>
  </div>
  );
};

export default Dashboard;
