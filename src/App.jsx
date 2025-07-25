import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";

export default function App() {
  const [playerName, setPlayerName] = useState("");

  return (
    <>
      {!playerName ? (
        <StartScreen onStart={setPlayerName} />
      ) : (
        <GameBoard playerName={playerName} />
      )}
    </>
  );
}
