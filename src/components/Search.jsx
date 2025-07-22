import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">
      <input
        type="text"
        placeholder="Search through thousands of movies"
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-4 pl-12 rounded-xl bg-dark-800 text-white placeholder-gray-400 focus:outline-none"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
        🔍
      </span>
    </div>
  );
};

export default Search;


      

