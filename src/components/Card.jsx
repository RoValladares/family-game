export default function Card({ card, handleClick, isFlipped, isMatched }) {
  return (
    <div
      className="w-24 h-32 m-2 perspective cursor-pointer"
      onClick={() => handleClick(card)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform preserve-3d ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        {/* Cara trasera */}
        <div className="absolute w-full h-full backface-hidden bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-100 shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl font-bold">?</span>
        </div>

        {/* Cara frontal */}
        <div className="absolute w-full h-full backface-hidden transform rotate-y-180">
          <img
            src={card.image}
            alt="Mascota"
            className="w-full h-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
