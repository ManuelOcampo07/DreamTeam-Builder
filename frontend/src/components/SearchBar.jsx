import React, { useState } from 'react';
import { searchPlayers } from '../api';

function SearchBar({ onSearchResults, onPlayerSelect }) {
  const [query, setQuery] = useState('');
  const [internalSearchResults, setInternalSearchResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      const results = await searchPlayers(query);
      setInternalSearchResults(results);
      onSearchResults(results);
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
    </div>
  );
}

export default SearchBar;
