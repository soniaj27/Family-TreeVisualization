import React, { useState } from 'react';

function InputForm({ onAddMember }) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleAddMember = () => {
    if (name && relationship) {
      onAddMember({ name, relationship });
      setName('');
      setRelationship('');
    }
  };

  return (
    <div className="input-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Relationship"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
      />
      <button onClick={handleAddMember}>Add</button>
    </div>
  );
}

export default InputForm;
