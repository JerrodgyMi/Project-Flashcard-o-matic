import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { Link } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    listDecks(controller.signal).then(setDecks);

    return () => controller.abort();
  }, []);

  const handleDelete = async (deckId) => {
    if (window.confirm("Delete this deck?")) {
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((d) => d.id !== deckId));
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary mb-3">
        Create Deck
      </Link>

      {decks.map((deck) => (
        <div key={deck.id} className="border p-3 mb-3">
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <p>{deck.cards?.length || 0} cards</p>

          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-2">View</button>
          </Link>

          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary mr-2">Study</button>
          </Link>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(deck.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;