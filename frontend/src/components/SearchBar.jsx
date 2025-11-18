// frontend/src/components/SearchBar.jsx
import React, { useState } from 'react';
import { searchPlayers } from '../api'; // Adjust path as necessary

function SearchBar({ onSearchResults, onPlayerSelect }) {
  const [query, setQuery] = useState('');
  const [internalSearchResults, setInternalSearchResults] = useState([]); // Manage local results

  const handleSearch = async () => {
    if (query.trim()) {
      const results = await searchPlayers(query);
      setInternalSearchResults(results);
      onSearchResults(results); // Pass results up to App.jsx
    } else {
      setInternalSearchResults([]);
      onSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="ENTER PLAYER'S NAME..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>

      {/* This list is now rendered in App.jsx, but keeping the state here for demonstration.
          onSearchResults prop is used to pass data to App.jsx
      */}
    </div>
  );
}

export default SearchBar;
