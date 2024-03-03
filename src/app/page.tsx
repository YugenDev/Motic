import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const HomePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500" />
      <div className="z-10 max-w-lg mx-auto text-center relative">
        <h1 className="text-4xl font-bold text-white mb-8">Bienvenido a Motic</h1>
        <p className="text-lg text-white mb-8">Registra cómo te sientes a lo largo del día para mantener un seguimiento de tu bienestar emocional.</p>
        <Link legacyBehavior href="/login">
          <a className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out">Comenzar</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
