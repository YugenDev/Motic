"use client";

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://fictional-carnival-r4ggwppp69rpfqq5-8000.app.github.dev/usuarios/iniciar-sesion',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: username,
            contraseña: password,
          }),
        }
      );

      if (response.ok) {
        const usuario = await response.json();
        // Aquí puedes manejar la lógica de inicio de sesión con el usuario obtenido
        console.log("Inicio de sesión exitoso:", usuario);
        router.push('/dashboard');
      } else {
        console.error("Error al iniciar sesión:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 to-yellow-500">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Inicio de sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Iniciar sesión
          </button>
          <p className="text-center text-gray-600 mt-2">
            ¿No tienes una cuenta?{" "}
            <Link legacyBehavior href="../sign-in">
              <a href="#" className="text-blue-500">
                Regístrate
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
