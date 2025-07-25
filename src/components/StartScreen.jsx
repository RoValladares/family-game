// src/components/StartScreen.jsx
import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() !== "") {
      onStart(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <h1 className="text-4xl font-bold mb-4">Family Game</h1>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 text-black rounded mb-4"
      />
      <button
        onClick={handleStart}
        className="bg-white text-primary px-4 py-2 rounded font-bold"
      >
        Play Game
      </button>
    </div>
  );
}
