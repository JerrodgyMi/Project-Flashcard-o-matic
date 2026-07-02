import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal).then(setDeck);
    return () => controller.abort();
  }, [deckId]);

  const reload = () => readDeck(deckId).then(setDeck);

  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck?")) {
      await deleteDeck(deck.id);
      navigate("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Delete this card?")) {
      await deleteCard(cardId);
      reload();
    }
  };

  if (!deck) return null;

  return (
    <div>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      <Link to={`/decks/${deck.id}/edit`}>
        <button className="btn btn-secondary mr-2">Edit</button>
      </Link>

      <Link to={`/decks/${deck.id}/study`}>
        <button className="btn btn-primary mr-2">Study</button>
      </Link>

      <Link to={`/decks/${deck.id}/cards/new`}>
        <button className="btn btn-primary mr-2">Add Cards</button>
      </Link>

      <button className="btn btn-danger" onClick={handleDeleteDeck}>
        Delete Deck
      </button>

      <h3 className="mt-4">Cards</h3>

      {deck.cards?.map((card) => (
        <div key={card.id} className="border p-2 mb-2">
          <p><strong>Q:</strong> {card.front}</p>
          <p><strong>A:</strong> {card.back}</p>

          <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary mr-2">Edit</button>
          </Link>

          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCard(card.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Deck;