import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name or barcode..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Search</button>
    </form>
  );
};

export default SearchBar; 