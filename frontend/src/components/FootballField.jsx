// frontend/src/components/FootballField.jsx
import React from 'react';
import formation442 from '../assets/formation_442.json'; // Ensure this path is correct

function FootballField({ selectedTeam = {}, onPositionClick, selectedPlayer }) {
  return (
    <div className="football-field-container">
      <h3>{formation442.name} Formation</h3>
      <svg className="football-field" viewBox="0 0 100 100">
        {/* Field background and lines */}
        <rect x="0" y="0" width="100" height="100" fill="#388E3C" /> {/* Green field */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" /> {/* Half-way line */}
        <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="0.5" fill="none" /> {/* Center circle */}
        <circle cx="50" cy="50" r="0.5" fill="white" /> {/* Center spot */}

        {/* Penalty boxes and goal areas - simplified for now */}
        <rect x="15" y="0" width="70" height="18" stroke="white" strokeWidth="0.5" fill="none" /> {/* Top penalty box */}
        <rect x="35" y="0" width="30" height="6" stroke="white" strokeWidth="0.5" fill="none" /> {/* Top goal area */}
        <rect x="15" y="82" width="70" height="18" stroke="white" strokeWidth="0.5" fill="none" /> {/* Bottom penalty box */}
        <rect x="35" y="94" width="30" height="6" stroke="white" strokeWidth="0.5" fill="none" /> {/* Bottom goal area */}

        {/* Goal posts - simplified */}
        <rect x="45" y="0" width="10" height="1" fill="white" /> {/* Top Goal */}
        <rect x="45" y="99" width="10" height="1" fill="white" /> {/* Bottom Goal */}

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
                fill={player ? "#FFC107" : (isSelectedPosition ? "#4CAF50" : "rgba(255,255,255,0.5)")} // Highlight if player assigned or selected for assignment
                stroke={isSelectedPosition ? "#000000" : "black"}
                strokeWidth="0.5"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="3"
                fill={player ? "black" : "white"}
              >
                {player ? player.name.split(' ')[0] : pos.role} {/* Show player name or role */}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default FootballField;