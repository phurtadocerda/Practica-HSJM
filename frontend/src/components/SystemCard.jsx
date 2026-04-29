import React from 'react';

const SystemCard = ({ image, title, desc, link, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (link && link !== "#") {
      window.open(link, '_blank');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center group cursor-pointer hover:-translate-y-2 border border-slate-50 min-h-[220px]"
    >
      <h4 className="text-blue-600 font-bold text-lg mb-4 text-center group-hover:scale-110 transition-transform tracking-tighter italic uppercase">
        {title}
      </h4>

      <div className="w-32 h-32 flex items-center justify-center mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      <div className="w-24 h-1.5 bg-[#00a19a] rounded-full mb-4 group-hover:w-32 transition-all"></div>

      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-center">
        {desc}
      </p>
    </div>
  );
};

export default SystemCard;