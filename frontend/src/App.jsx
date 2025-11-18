// frontend/src/App.jsx
import React, { useState } from 'react';
import FootballField from './components/FootballField';
import SearchBar from './components/SearchBar';
import PlayerDetails from './components/PlayerDetails';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [teamFormation, setTeamFormation] = useState({}); // Stores players assigned to positions

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const handlePositionClick = (positionId) => {
    if (selectedPlayer) {
      setTeamFormation(prevFormation => {
        const newFormation = { ...prevFormation };

        // If the player is already assigned to a position, remove them from there first
        const existingPositionId = Object.keys(newFormation).find(
          key => newFormation[key]?._id === selectedPlayer._id
        );
        if (existingPositionId) {
          delete newFormation[existingPositionId];
        }

        // Assign the player to the new position
        newFormation[positionId] = { ...selectedPlayer, assignedPosition: positionId };
        return newFormation;
      });
      setSelectedPlayer(null); // Clear selected player after assignment
    } else {
      // Option to remove player from position if no player is selected
      setTeamFormation(prevFormation => {
        const newFormation = { ...prevFormation };
        if (newFormation[positionId]) {
          delete newFormation[positionId];
        }
        return newFormation;
      });
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>USER'S DREAMTEAM</h1>
      </header>
      <main className="app-main">
        <aside className="app-sidebar">
          <SearchBar onSearchResults={setSearchResults} onPlayerSelect={handlePlayerSelect} />
          <div className="search-results-list">
            {searchResults.map(player => (
              <div
                key={player._id}
                className={`player-search-item ${selectedPlayer?._id === player._id ? 'selected' : ''}`}
                onClick={() => handlePlayerSelect(player)}
              >
                {player.name} ({player.nationality})
              </div>
            ))}
          </div>
          <PlayerDetails player={selectedPlayer} />
        </aside>
        <section className="app-content">
          <FootballField
            selectedTeam={teamFormation}
            onPositionClick={handlePositionClick}
            selectedPlayer={selectedPlayer}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
