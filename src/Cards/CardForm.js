import React, { useState } from "react";

function CardForm({ initialCard = { front: "", back: "" }, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialCard);

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
        <label>Front</label>
        <textarea
          name="front"
          className="form-control"
          value={formData.front || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Back</label>
        <textarea
          name="back"
          className="form-control"
          value={formData.back || ""}
          onChange={handleChange}
        />
      </div>

      <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>
        Cancel
      </button>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;