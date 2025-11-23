import React from 'react';
import formation442 from '../assets/formation_442.json';

function FootballField({ selectedTeam = {}, onPositionClick, selectedPlayer }) {
  return (
    <div className="football-field-container">
      <div className="formation-name-display">
        {formation442.name}
      </div>
      <svg className="football-field" viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill="#2E7D32" /> {/* Darker green */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="0.5" fill="white" />
        <rect x="15" y="0" width="70" height="18" stroke="white" strokeWidth="0.5" fill="none" />
        <rect x="35" y="0" width="30" height="6" stroke="white" strokeWidth="0.5" fill="none" />
        <rect x="15" y="82" width="70" height="18" stroke="white" strokeWidth="0.5" fill="none" />
        <rect x="35" y="94" width="30" height="6" stroke="white" strokeWidth="0.5" fill="none" />
        <rect x="45" y="0" width="10" height="1" fill="white" />
        <rect x="45" y="99" width="10" height="1" fill="white" />

        {formation442.positions.map(pos => {
          const player = selectedTeam[pos.id];
          const isSelectedPosition = selectedPlayer && selectedPlayer.assignedPosition === pos.id;
          return (
            <g
              key={pos.id}
              onClick={() => onPositionClick(pos.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="5"
                fill={player ? "black" : (isSelectedPosition ? "#4CAF50" : "black")}
                stroke={isSelectedPosition ? "#4CAF50" : "white"}
                strokeWidth="0.5"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="3"
                fill="white"
                style={{ pointerEvents: 'none' }} /* Prevent text from interfering with click */
              >
                {player ? player.name.split(' ')[0] : pos.role}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default FootballField;