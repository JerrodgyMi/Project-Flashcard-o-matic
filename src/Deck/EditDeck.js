import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleSubmit = async (updatedDeck) => {
    await updateDeck({ ...updatedDeck, id: deck.id });
    navigate(`/decks/${deck.id}`);
  };

  if (!deck) return null;

  return (
    <div>
      <h2>Edit Deck</h2>
      <DeckForm
        initialDeck={deck}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/decks/${deck.id}`)}
      />
    </div>
  );
}

export default EditDeck;