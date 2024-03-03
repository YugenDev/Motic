"use client";

import React from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log("Formulario de inicio de sesión enviado");
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