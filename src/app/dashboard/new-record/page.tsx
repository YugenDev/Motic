"use client";

import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEmotionRecord } from '@/app/api/emotionRecords';
import CircleImage from './CircleImage/CircleImage';// Importar la imagen de referencia del círculo de emociones

const NewRecordForm = () => {
    const router = useRouter();
    const [emocion, setEmocion] = useState('');
    const [color, setColor] = useState(''); // Estado para el color seleccionado
    const [comentario, setComentario] = useState('');
    const userId = localStorage.getItem('userId');

    // Lista de colores predeterminados basados en el círculo de las emociones
    const opcionesColores = ['Rojo 🔴', 'Verde 🟢', 'Azul 🔵', 'Amarillo 🟡', 'Naranja 🟠', 'Morado 🟣'];

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const fecha = new Date().toLocaleDateString('es-ES', { // Formatear la fecha como DD/MM/YYYY
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        try {
            await createEmotionRecord({
                usuario_id: userId,
                fecha,
                emocion,
                color,
                comentario
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error al crear el registro emocional:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Nuevo Registro Emocional</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <CircleImage/>
                </div>
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="emocion" className="block mb-1">Emoción</label>
                            <input
                                type="text"
                                id="emocion"
                                value={emocion}
                                placeholder='Escribe una serie de emociones'
                                onChange={(e) => setEmocion(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="color" className="block mb-1">Color</label>
                            <select
                                id="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Selecciona un color</option>
                                {opcionesColores.map((color, index) => (
                                    <option key={index} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="comentario" className="block mb-1">Comentario</label>
                            <textarea
                                placeholder='¡Haz un comentario sobre como te sientes animica y fisicamente!'
                                id="comentario"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Crear Registro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewRecordForm;
