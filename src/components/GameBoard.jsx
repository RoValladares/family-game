import { useState } from "react";
import Card from "./Card";
import pet1 from "../assets/pet1.png";
import pet2 from "../assets/pet2.png";
import pet3 from "../assets/pet3.png";
import pet4 from "../assets/pet4.png";
import pet5 from "../assets/pet5.png";
import pet6 from "../assets/pet6.jpg";
import pet7 from "../assets/pet7.png";
import pet8 from "../assets/pet8.png";

function shuffleDeck(images) {
  return [...images, ...images]
    .map((image, index) => ({
      id: index + Math.random(), // id único con número random para evitar keys repetidas al resetear
      image,
    }))
    .sort(() => Math.random() - 0.5);
}

export default function GameBoard({ playerName }) {
  const images = [pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8];

  const [cards, setCards] = useState(() => shuffleDeck(images));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [moves, setMoves] = useState(0);
  const [manualWin, setManualWin] = useState(false);

  const handleClick = (card) => {
    if (
      flipped.length === 2 ||
      flipped.find((f) => f.id === card.id) ||
      matched.includes(card.id) ||
      isBusy
    ) {
      return;
    }

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (newFlipped[0].image === newFlipped[1].image) {
        setMatched((prev) => [...prev, newFlipped[0].id, newFlipped[1].id]);
        setTimeout(() => setFlipped([]), 500);
      } else {
        setIsBusy(true);
        setTimeout(() => {
          setFlipped([]);
          setIsBusy(false);
        }, 1000);
      }
    }
  };

  const gameWon = matched.length === cards.length;

  const resetGame = () => {
    setCards(shuffleDeck(images));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsBusy(false);
    setManualWin(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white p-4">
      <header className="w-full flex justify-between items-center mb-4 px-2">
        <div className="font-semibold text-lg">
          Player: <span className="text-yellow-300">{playerName}</span>
        </div>
        <div className="font-semibold text-lg">
          Movimientos: <span className="text-yellow-300">{moves}</span>
        </div>
      </header>

      {/* Botones */}
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700 transition"
          onClick={() => setManualWin(true)}
        >
          Ganar (prueba)
        </button>
        <button
          className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition"
          onClick={resetGame}
        >
          Reiniciar juego
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            isFlipped={!!flipped.find((f) => f.id === card.id)}
            isMatched={matched.includes(card.id)}
          />
        ))}
      </div>

      {(gameWon || manualWin) && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-green-600 rounded-lg p-6 text-center max-w-sm mx-4 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              ¡Buenale, ganaste {playerName}!
            </h2>
            <p className="mb-4">Movimientos realizados: {moves}</p>
            <button
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded"
              onClick={() => setManualWin(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
