import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Buscar unidad, usuario..." }) => {
  return (
    <div className="relative w-full md:w-80 flex shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-cyan-500 transition-all">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow px-4 py-2 text-sm focus:outline-none"
        value={value}
        onChange={onChange}
      />
      <div className="bg-[#003876] text-white p-3">
        <Search size={18} />
      </div>
    </div>
  );
};

export default SearchBar;