import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [isStarting, setIsStarting] = useState(true);

  const handleStart = (name) => {
    setPlayerName(name);
    setIsStarting(false);
  };

  return (
    <div className="min-h-screen">
      {isStarting ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameBoard playerName={playerName} />
      )}
    </div>
  );
}
