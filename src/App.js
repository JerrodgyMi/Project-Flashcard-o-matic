import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home/Home";
import Deck from "./Deck/Deck";
import CreateDeck from "./Deck/CreateDeck";
import EditDeck from "./Deck/EditDeck";
import Study from "./Study/Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import NotFound from "./Layout/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="decks/new" element={<CreateDeck />} />
        <Route path="decks/:deckId" element={<Deck />} />
        <Route path="decks/:deckId/edit" element={<EditDeck />} />

        <Route path="decks/:deckId/study" element={<Study />} />
        <Route path="decks/:deckId/cards/new" element={<AddCard />} />
        <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;