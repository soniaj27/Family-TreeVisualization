import React from 'react';

function FamilyList({ members, onDeleteMember }) {
  return (
    <div className="family-list">
      <h2>Family Members</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member.name} ({member.relationship})
            <button onClick={() => onDeleteMember(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyList;
