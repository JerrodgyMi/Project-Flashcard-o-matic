import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  if (!deck) return <h2>Loading...</h2>;

  const cards = deck.cards || [];

  if (cards.length < 3) {
    return (
      <div>
        <h3>{deck.name}</h3>
        <h3>Not enough cards.</h3>

        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    );
  }

  const card = cards[index];

  const flip = () => setFlipped(true);

  const next = () => {
    setFlipped(false);

    if (index + 1 < cards.length) {
      setIndex(index + 1);
    } else {
      if (window.confirm("Restart cards?")) {
        setIndex(0);
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div>
      <h3>{deck.name}</h3>

      <h3>
        Card {index + 1} of {cards.length}
      </h3>

      <div className="border p-3 mb-3">
        {flipped ? card.back : card.front}
      </div>

      {!flipped ? (
        <button className="btn btn-secondary" onClick={flip}>
          Flip
        </button>
      ) : (
        <button className="btn btn-primary" onClick={next}>
          Next
        </button>
      )}
    </div>
  );
}

export default Study;