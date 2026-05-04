import React from 'react';
import { Plus } from 'lucide-react';

const AddButton = ({ onClick, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="bg-[#003876] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-600 transition-all shadow-md"
    >
      <Plus size={20} /> AÑADIR ARCHIVO
    </button>
  );
};

export default AddButton;