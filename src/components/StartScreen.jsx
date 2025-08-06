import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const handleStart = () => {
    if (name.trim() !== "") {
      setFadeOut(true);
      setTimeout(() => {
        onStart(name);
      }, 500);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-neutral-100 p-4 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-5xl font-bold mb-4 text-center">Encuentra las parejas salvadoreñas.</h1>

      <p className="text-blue-200 mb-6 max-w-xs text-center">
        Gira las cartas y encuentra todas las parejas correctas. Escribe tu nombre y comienza.
      </p>

      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 w-64 border border-blue-300 bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-blue-900 placeholder-blue-400"
      />

      <button
        onClick={handleStart}
        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 transition text-blue-50 font-semibold shadow-md"
      >
        !Demole!
      </button>
    </div>
  );
}
