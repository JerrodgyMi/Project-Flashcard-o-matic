import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createCard(deckId, formData);
    setFormData({ front: "", back: "" });
  };

  return (
    <div>
      {/* IMPORTANT: deck name must be standalone text */}
      <h2>{deck.name}</h2>
      <h3>Add Card</h3>

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            className="form-control"
            name="front"
            value={formData.front}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label>Back</label>
          <textarea
            className="form-control"
            name="back"
            value={formData.back}
            onChange={changeHandler}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>

      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-secondary mt-3">
          Done
        </button>
      </Link>
    </div>
  );
}

export default AddCard;