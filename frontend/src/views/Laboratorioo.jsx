import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const LaboratorioInstructivo = () => { // 2. Quitamos el prop onNavigate antiguo
  const navigate = useNavigate(); // 3. Inicializamos el hook para navegar

  // === LISTA DE DOCUMENTOS EXACTA DE TU IMAGEN ===
  const documentos = [
    { name: "instructivos a pacientes PDF", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/instructivos-a-pacientes-PDF.docx" }, 
    { name: "SARAMPION-RUBEOLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/SARAMPION-RUBEOLA.pdf" }, 
    { name: "PCR CHAGAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/PCR-CHAGAS.pdf" }, 
    { name: "HTLV 1-2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HTLV-1-2.pdf" }, 
    { name: "CITOMEGALOVIRUS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CITOMEGALOVIRUS.pdf" }, 
    { name: "BARTONELLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/BARTONELLA.pdf" }, 
    { name: "CARTERA DE EXAMENES 2021 HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CARTERA-DE-EXAMENES-2021-HSJM.pdf" }, 
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER CON BOTÓN VOLVER Y TÍTULO GRANDE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => navigate('/accesos')} // 4. Cambiamos onNavigate por navigate('/ruta')
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A ACCESOS
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase mt-2">
            LABORATORIO – INSTRUCTIVOS EXÁMENES Y FORMULARIOS ISP
          </h2>
        </div>
      </div>

      {/* CONTENEDOR MÁS ANCHO PARA EVITAR ESPACIO BLANCO */}
      <div className="w-full max-w-7xl mx-auto space-y-10 pt-4 flex flex-col items-start">
        
        {/* LISTA DE ENLACES */}
        <div className="w-full pl-2 md:pl-6">
          <ul className="space-y-6">
            {documentos.map((doc, index) => (
              <li key={index} className="flex items-center gap-4 group">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-bold text-lg md:text-2xl underline underline-offset-4 hover:text-blue-700 transition-colors uppercase tracking-tight"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default LaboratorioInstructivo;