import React from 'react';

function PlayerDetails({ player }) {
  if (!player) {
    return <div className="player-details">No player selected.</div>;
  }

  return (
    <div className="player-details">
      <h3>{player.name} ({player.nationality})</h3>
      <p><strong>Full Name:</strong> {player.full_name}</p>
      <p><strong>Age:</strong> {player.age}</p>
      <p><strong>Club:</strong> {player.club_team}</p>
      <p><strong>Positions:</strong> {player.positions}</p>
      <p><strong>Height:</strong> {player.height_cm} cm</p>
      <p><strong>Weight:</strong> {player.weight_kgs} kg</p>
      <p><strong>Overall Rating:</strong> {player.overall_rating}</p>
      <p>Click a position on the field to assign this player.</p>
    </div>
  );
}

export default PlayerDetails;