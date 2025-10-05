import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white shadow rounded-full px-4 py-2 w-full max-w-lg mx-auto mb-6"
    >
      <input
        type="text"
        placeholder="Search location..."
        className="flex-grow outline-none px-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600"
      >
        Search
      </button>
    </form>
  );
}
