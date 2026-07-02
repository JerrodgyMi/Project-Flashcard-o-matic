import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  const changeHandler = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateCard(card);
    navigate(`/decks/${deckId}`);
  };

  const cancelHandler = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>
        {deck.name} : Edit Card {cardId}
      </h2>

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            className="form-control"
            name="front"
            value={card.front}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Back</label>
          <textarea
            className="form-control"
            name="back"
            value={card.back}
            onChange={changeHandler}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;