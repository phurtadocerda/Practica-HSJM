import React from 'react';
import { ChevronLeft, FolderKanban, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const GestionProyectos = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos la navegación

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button 
            onClick={() => navigate('/inicio')} // 4. CORRECCIÓN: Usamos navigate('/inicio')
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 mb-6 text-xs transition-all"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg"><FolderKanban size={32} /></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter">Gestión de <span className="text-indigo-600">Proyectos</span></h2>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-500 italic font-bold text-lg mb-8">Descargar:</h3>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2021/08/Gestion-de-proyectos-HSJM.docx" 
            target="_blank" 
            rel="noreferrer" // Buena práctica añadida
            className="text-2xl md:text-3xl font-bold text-black hover:text-indigo-600 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            Gestion de proyectos HSJM
          </a>
        </div>
      </div>
    </section>
  );
};

export default GestionProyectos;