"use client";

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: '',
    contraseña: '',
  });
  const router = useRouter()

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('https://fictional-carnival-r4ggwppp69rpfqq5-8000.app.github.dev/usuarios/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Usuario registrado exitosamente');
        router.push("/login")
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 to-yellow-500">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="nombre"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="contraseña"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Registrarse
          </button>
          <p className="text-center text-gray-600 mt-2">
            ¿Ya tienes una cuenta?{" "}
            <Link legacyBehavior href="../login">
            <a href="#" className="text-blue-500">
              Iniciar sesión
            </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
