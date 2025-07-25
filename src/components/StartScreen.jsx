import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() !== "") {
      onStart(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-200 text-neutral-900 p-4">
      <h1 className="text-4xl font-bold mb-4">Family Game</h1>

      <p className="text-neutral-500 mb-6 max-w-xs text-center">
        Encuentra todas las parejas de cartas iguales. Escribe tu nombre y comienza.
      </p>

      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 w-64 border border-neutral-400 rounded focus:outline-none focus:border-neutral-600 mb-4 text-neutral-900"
      />

      <button
        onClick={handleStart}
        className="px-6 py-2 bg-neutral-900 text-neutral-100 rounded hover:bg-neutral-800 transition"
      >
        Play Game
      </button>
    </div>
  );
}
