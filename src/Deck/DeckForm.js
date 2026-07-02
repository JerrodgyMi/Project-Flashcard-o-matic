import React, { useState } from "react";

function DeckForm({ initialDeck = { name: "", description: "" }, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialDeck);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          className="form-control"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-secondary mr-2" type="button" onClick={onCancel}>
        Cancel
      </button>

      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}

export default DeckForm;