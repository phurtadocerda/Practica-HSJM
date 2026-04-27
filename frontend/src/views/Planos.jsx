import React, { useState } from 'react';
import { ChevronLeft, Map, Download, FileText, MapPin, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const Planos = () => { // 2. Quitamos el prop onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook para navegar

  const listaPlanos = [
    // ÍNDICE
    { id: 1, categoria: "Índice", nombre: "HSJM-AR-DW-000 (UNIDADES CLÍNICAS)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-000-UNIDADES-CLINICAS_Rev-6_SEREMI-000.pdf" },
    
    // NIVEL -1
    { id: 2, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-100", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-100.pdf" },
    { id: 3, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-200", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-200.pdf" },
    { id: 4, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-201", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-201.pdf" },
    { id: 5, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-300", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-300.pdf" },
    { id: 6, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-301", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-301.pdf" },
    { id: 7, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-500", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-500.pdf" },
    { id: 8, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-700", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-700.pdf" },
    { id: 9, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-800", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-800.pdf" },
    { id: 10, categoria: "Nivel -1", nombre: "HSJM-AR-DW-100 (PN-1_100) SEREMI-801", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-801.pdf" },

    // NIVEL 1
    { id: 11, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-102", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-102.pdf" },
    { id: 12, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-204", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-204.pdf" },
    { id: 13, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-205", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-205.pdf" },
    { id: 14, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-302", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-302.pdf" },
    { id: 15, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-303", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-303.pdf" },
    { id: 16, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-304", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-304.pdf" },
    { id: 17, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-400", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-400.pdf" },
    { id: 18, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-501", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-501.pdf" },
    { id: 19, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-600", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-600.pdf" },
    { id: 20, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-701", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-701.pdf" },
    { id: 21, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-802", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-802.pdf" },
    { id: 22, categoria: "Nivel 1", nombre: "HSJM-AR-DW-101 (PN1_100) SEREMI-803", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-803.pdf" },

    // NIVEL 2
    { id: 23, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-103", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-103.pdf" },
    { id: 24, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-206", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-206.pdf" },
    { id: 25, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-207", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-207.pdf" },
    { id: 26, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-305", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-305.pdf" },
    { id: 27, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-306", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-306.pdf" },
    { id: 28, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-401", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-401.pdf" },
    { id: 29, categoria: "Nivel 2", nombre: "HSJM-AR-DW-102 (PN2_100) SEREMI-601", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-601.pdf" },

    // NIVEL 3
    { id: 30, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-104", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-104.pdf" },
    { id: 31, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-208", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-208.pdf" },
    { id: 32, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-209", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-209.pdf" },
    { id: 33, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-307", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-307.pdf" },
    { id: 34, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-308", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-308.pdf" },
    { id: 35, categoria: "Nivel 3", nombre: "HSJM-AR-DW-103 (PN3_100) SEREMI-602", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-602.pdf" },

    // NIVEL 4
    { id: 36, categoria: "Nivel 4", nombre: "HSJM-AR-DW-104 (PN4_100) SEREMI-105", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-105.pdf" },
    { id: 37, categoria: "Nivel 4", nombre: "HSJM-AR-DW-104 (PN4_100) SEREMI-210", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-210.pdf" },
    { id: 38, categoria: "Nivel 4", nombre: "HSJM-AR-DW-104 (PN4_100) SEREMI-211", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-211.pdf" },
    { id: 39, categoria: "Nivel 4", nombre: "HSJM-AR-DW-104 (PN4_100) SEREMI-309", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-309.pdf" },

    // NIVEL 5
    { id: 40, categoria: "Nivel 5", nombre: "HSJM-AR-DW-105 (PN5_100) SEREMI-106", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-106.pdf" },
    { id: 41, categoria: "Nivel 5", nombre: "HSJM-AR-DW-105 (PN5_100) SEREMI-212", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-212.pdf" },
    { id: 42, categoria: "Nivel 5", nombre: "HSJM-AR-DW-105 (PN5_100) SEREMI-213", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-213.pdf" },

    // NIVEL 6
    { id: 43, categoria: "Nivel 6", nombre: "HSJM-AR-DW-106 (PN6_100) SEREMI-214", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-106-PN6_100_Rev-6_SEREMI-214.pdf" },
    { id: 44, categoria: "Nivel 6", nombre: "HSJM-AR-DW-106 (PN6_100) SEREMI-215", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-106-PN6_100_Rev-6_SEREMI-215.pdf" },

    // NIVEL 7
    { id: 45, categoria: "Nivel 7", nombre: "HSJM-AR-DW-107 (PN7_100) SEREMI-216", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-107-PN7_100_Rev-5_SEREMI-216.pdf" },
    { id: 46, categoria: "Nivel 7", nombre: "HSJM-AR-DW-107 (PN7_100) SEREMI-217", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HSJM-AR-DW-107-PN7_100_Rev-5_SEREMI-217.pdf" },
  ];

  const [planoActivo, setPlanoActivo] = useState(listaPlanos[0]);
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  const ordenCategorias = [
    "Índice", 
    "Nivel -1", 
    "Nivel 1", 
    "Nivel 2", 
    "Nivel 3", 
    "Nivel 4", 
    "Nivel 5", 
    "Nivel 6", 
    "Nivel 7"
  ];

  return (
    <section className="bg-slate-50 rounded-[1.5rem] p-3 md:p-8 shadow-2xl border border-slate-100 min-h-[85vh] w-full font-sans animate-in fade-in zoom-in duration-500 flex flex-col mb-20 md:mb-0">
      
      {/* HEADER TÍTULO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
        <div>
          {/* BOTÓN VOLVER ARREGLADO */}
          <button onClick={() => navigate('/inicio')} className="bg-white hover:bg-[#ffb81c] text-[#003876] px-4 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-3 text-[10px] md:text-xs shadow-sm border border-slate-200">
            <ChevronLeft size={14} /> VOLVER
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-[#003876] p-2 rounded-lg text-white shadow-md hidden md:block">
              <Map size={20} />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
              Planos <span className="text-cyan-600">Hospital</span>
            </h2>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-400 bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-full text-xs font-bold">
          <FileText size={16} className="text-cyan-600" /> Oficiales PDF
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-grow lg:h-[650px]">
        
        {/* COLUMNA IZQUIERDA: LISTA Y FILTRO */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-sm max-h-[400px] lg:max-h-full">
          
          <div className="mb-3 border-b border-slate-100 pb-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1 mb-1">
              <Filter size={12} /> Filtrar por Nivel
            </label>
            <select 
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#003876] outline-none focus:border-cyan-500 cursor-pointer appearance-none"
            >
              <option value="Todos">Mostrar Todos</option>
              {ordenCategorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {ordenCategorias.map(categoria => {
              if (filtroNivel !== 'Todos' && filtroNivel !== categoria) return null;

              const planosDeEsteNivel = listaPlanos.filter(p => p.categoria === categoria);
              if (planosDeEsteNivel.length === 0) return null;

              return (
                <div key={categoria} className="flex flex-col gap-2 relative">
                  <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-1.5 border-b-2 border-cyan-100 mb-1">
                    <h4 className="text-[#003876] font-black uppercase text-[10px] md:text-xs tracking-widest">
                      {categoria}
                    </h4>
                  </div>

                  {planosDeEsteNivel.map((plano) => (
                    <div 
                      key={plano.id} 
                      className={`flex items-center justify-between p-2 md:p-3 rounded-xl border transition-all ${
                        planoActivo.id === plano.id 
                        ? 'bg-[#003876] border-[#003876] text-white shadow-md ml-1 border-l-4 border-l-[#ffb81c]' 
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-cyan-500 cursor-pointer hover:bg-white'
                      }`}
                      onClick={() => setPlanoActivo(plano)}
                    >
                      <div className="flex items-center gap-2 flex-grow overflow-hidden">
                        <div className={`p-1.5 rounded-lg shrink-0 ${planoActivo.id === plano.id ? 'bg-white/20' : 'bg-white shadow-sm text-cyan-600'}`}>
                          <MapPin size={14} />
                        </div>
                        <div className="flex flex-col min-w-0 pr-1">
                          <span className="font-bold text-[11px] md:text-xs truncate" title={plano.nombre}>
                            {plano.nombre}
                          </span>
                        </div>
                      </div>

                      <a 
                        href={plano.url} 
                        target="_blank" 
                        rel="noreferrer"
                        download 
                        onClick={(e) => e.stopPropagation()} 
                        className={`p-1.5 rounded-lg transition-all shrink-0 ${
                          planoActivo.id === plano.id 
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-inner' 
                          : 'bg-white border text-slate-400 hover:text-[#003876]'
                        }`}
                        title="Descargar Plano"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: VISOR PDF */}
        <div className="w-full lg:w-2/3 bg-slate-200 rounded-2xl border-2 md:border-4 border-white shadow-lg flex flex-col overflow-hidden relative h-[400px] lg:h-full mt-4 lg:mt-0">
          <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center z-10 shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText size={16} className="text-cyan-600 shrink-0" />
              <span className="font-black text-[#003876] text-[10px] md:text-sm truncate uppercase italic">{planoActivo.nombre}</span>
            </div>
          </div>

          <div className="flex-grow w-full bg-slate-300 relative">
            <iframe 
              src={`${planoActivo.url}#view=FitH`} 
              className="absolute inset-0 w-full h-full border-0" 
              title={`Visor PDF`}
            >
              <p className="p-4 text-center text-xs">Navegador no soporta PDF directo.</p>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planos;