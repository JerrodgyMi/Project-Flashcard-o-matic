import React from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const navigate = useNavigate();

  const handleSubmit = async (deck) => {
    const newDeck = await createDeck(deck);
    navigate(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <DeckForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}

export default CreateDeck;