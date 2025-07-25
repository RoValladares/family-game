import { useState, useEffect } from "react";
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
      id: index + Math.random(),
      image,
    }))
    .sort(() => Math.random() - 0.5);
}

// Componente para botón de reiniciar con icono y tooltip
function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Reiniciar juego"
      title="Reiniciar juego"
      className="p-2 rounded-full bg-neutral-900 text-neutral-100 hover:bg-neutral-800 transition flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582M20 20v-5h-.581M5.66 18.34A8 8 0 1118.34 5.66"
        />
      </svg>
    </button>
  );
}

export default function GameBoard({ playerName }) {
  const images = [pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8];

  const [cards, setCards] = useState(() => shuffleDeck(images));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    if (matched.length === cards.length) {
      setShowWinModal(true);
    }
  }, [matched, cards]);

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

  const resetGame = () => {
    setCards(shuffleDeck(images));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsBusy(false);
    setShowWinModal(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-neutral-200 text-neutral-900 p-4 overflow-x-hidden transition-opacity duration-500 opacity-0 animate-fadeIn">
      <header className="w-full flex justify-between items-center mb-4 px-2">
        <div className="font-semibold text-lg">
          Player: <span className="text-neutral-600">{playerName}</span>
        </div>
        <div className="font-semibold text-lg">
          Movimientos: <span className="text-neutral-600">{moves}</span>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap gap-4">
        {/* Botón con ícono para reiniciar */}
        <ResetButton onClick={resetGame} />
      </div>

      {/* CONTENEDOR DEL GRID */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-2 w-full max-w-[600px] mx-auto px-2 box-border overflow-hidden">
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
      </div>

      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-neutral-50 text-neutral-900 rounded-lg p-6 text-center max-w-sm mx-4 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              ¡Buenale, encontraste todas las parejas! {playerName}!
            </h2>
            <p className="mb-4">Movimientos realizados: {moves}</p>
            <button
              className="bg-neutral-900 text-neutral-100 font-semibold px-4 py-2 rounded hover:bg-neutral-800 transition"
              onClick={() => setShowWinModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
