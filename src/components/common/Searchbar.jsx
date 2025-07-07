// components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ placeholder , className }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      const trimmed = query.trim();
      const validOrderId = /^SO-\d+$/i;

      if (validOrderId.test(trimmed)) {
        setError('');
        navigate(`/orders/${trimmed}`);
      } else {
        setError('Please enter a valid Order ID (e.g., SO-123456)');
      }
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center border w-normal border-gray-300 rounded-md px-3 py-2 shadow-sm">
        <CiSearch className='mr-2'/>
        <input
          type="text"
          className="w-full outline-none bg-transparent text-sm"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default SearchBar;