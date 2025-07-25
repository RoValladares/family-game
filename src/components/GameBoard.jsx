import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Card from "./Card";

// ✅ Nuevas imágenes con `pairId`
import cat from "../assets/cat.png";
import catPair from "../assets/cat_pair.png";
import dog from "../assets/dog.png";
import dogPair from "../assets/dog_pair.png";
import bird from "../assets/bird.png";
import birdPair from "../assets/bird_pair.png";
import fish from "../assets/fish.png";
import fishPair from "../assets/fish_pair.png";

// Mezcla el deck con pairId
function shuffleDeck(images) {
  return [...images]
    .map((image, index) => ({
      id: index + Math.random(),
      pairId: image.pairId,
      image: image.src,
    }))
    .sort(() => Math.random() - 0.5);
}

// Botón de reinicio con icono
function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Reiniciar juego"
      title="Reiniciar juego"
      className="p-3 rounded-full bg-neutral-900 text-neutral-100 hover:bg-neutral-800 transition transform hover:rotate-90"
    >
      <FiRefreshCw className="w-6 h-6" />
    </button>
  );
}

export default function GameBoard({ playerName }) {
  const images = [
    { src: cat, pairId: 1 },
    { src: catPair, pairId: 1 },
    { src: dog, pairId: 2 },
    { src: dogPair, pairId: 2 },
    { src: bird, pairId: 3 },
    { src: birdPair, pairId: 3 },
    { src: fish, pairId: 4 },
    { src: fishPair, pairId: 4 },
  ];

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

      if (newFlipped[0].pairId === newFlipped[1].pairId) {
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
        <ResetButton onClick={resetGame} />
      </div>

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

      <footer className="mt-8 text-center text-neutral-500 text-sm">
        © 2025 Created by Rodrigo Valladares — Frontend Developer Jr.
      </footer>

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
