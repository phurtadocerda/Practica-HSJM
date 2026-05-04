import React, { useState } from 'react';
import { FileText, Download, X, ZoomIn } from 'lucide-react'; 
import PageHeader from '../components/PageHeader';

// === IMPORTACIÓN DE LAS 20 FOTOS EXACTAS ===
import reacre1 from '../assets/reacreditacion1.png';
import reacre2 from '../assets/reacreditacion2.png';
import reacre3 from '../assets/reacreditacion3.png';
import reacre4 from '../assets/reacreditacion4.png';
import reacre5 from '../assets/reacreditacion5.png';
import reacre6 from '../assets/reacreditacion6.png';
import reacre7 from '../assets/reacreditacion7.png';
import reacre8 from '../assets/reacreditacion8.png';
import reacre9 from '../assets/reacreditacion9.png';
import reacre10 from '../assets/reacreditacion10.png';
import reacre11 from '../assets/reacreditacion11.png';
import reacre12 from '../assets/reacreditacion12.png';
import reacre13 from '../assets/reacreditacion13.png';
import reacre14 from '../assets/reacreditacion14.png';
import reacre15 from '../assets/reacreditacion15.png';
import reacre16 from '../assets/reacreditacion16.png';
import reacre17 from '../assets/reacreditacion17.png';
import reacre18 from '../assets/reacreditacion18.png';
import reacre19 from '../assets/reacreditacion19.png';
import reacre20 from '../assets/reacreditacion20.png';

const Reacreditacion = () => {
  
  // ESTADO para controlar la foto agrandada
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Enlaces de descarga de los PDFs
  const descargas = [
    { name: "GRÁFICAS_REACREDITACIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GRAFICAS_REACREDITACION.pdf" },
    { name: "GRÁFICAS_REACREDITACIÓN2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GRAFICAS_REACREDITACION2.pdf" },
  ];

  // Grilla de las 20 fotos
  const galeriaFotos = [
    { id: 1, src: reacre1, alt: "Infografía 1" },
    { id: 2, src: reacre2, alt: "Infografía 2" },
    { id: 3, src: reacre3, alt: "Infografía 3" },
    { id: 4, src: reacre4, alt: "Infografía 4" },
    { id: 5, src: reacre5, alt: "Infografía 5" },
    { id: 6, src: reacre6, alt: "Infografía 6" },
    { id: 7, src: reacre7, alt: "Infografía 7" },
    { id: 8, src: reacre8, alt: "Infografía 8" },
    { id: 9, src: reacre9, alt: "Infografía 9" },
    { id: 10, src: reacre10, alt: "Infografía 10" },
    { id: 11, src: reacre11, alt: "Infografía 11" },
    { id: 12, src: reacre12, alt: "Infografía 12" },
    { id: 13, src: reacre13, alt: "Infografía 13" },
    { id: 14, src: reacre14, alt: "Infografía 14" },
    { id: 15, src: reacre15, alt: "Infografía 15" },
    { id: 16, src: reacre16, alt: "Infografía 16" },
    { id: 17, src: reacre17, alt: "Infografía 17" },
    { id: 18, src: reacre18, alt: "Infografía 18" },
    { id: 19, src: reacre19, alt: "Infografía 19" },
    { id: 20, src: reacre20, alt: "Infografía 20" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader
        title="Reacreditación"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECCIÓN 1: DESCARGAS */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Download className="text-[#00a19a]" size={26} strokeWidth={2.5}/>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Descargas:</h3>
          </div>
          
          <ul className="space-y-4">
            {descargas.map((doc, index) => (
              <li key={index} className="flex items-center gap-3 group">
                <FileText className="text-slate-500 group-hover:text-blue-700 transition-colors" size={20} />
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-bold text-lg md:text-xl underline underline-offset-4 hover:text-blue-700 transition-colors uppercase tracking-tight"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SECCIÓN 2: GALERÍA DE INFOGRAFÍAS */}
        <div className="pt-4 pb-12">
          <div className="border-l-4 border-[#00a19a] pl-4 mb-10">
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Infografías y Protocolos</h3>
            <p className="text-slate-500 font-medium mt-1">Haz clic en cualquier imagen para verla en grande (Total: 20 documentos)</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galeriaFotos.map((foto) => (
              <div 
                key={foto.id} 
                onClick={() => setSelectedPhoto(foto)}
                className="bg-white p-2 rounded-2xl shadow-md border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all hover:-translate-y-1 overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center relative">
                  <img 
                    src={foto.src} 
                    alt={foto.alt} 
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="text-white bg-black/50 p-3 rounded-full" size={48} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VISOR DE IMAGEN (MODAL) */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-300 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            onClick={() => setSelectedPhoto(null)} 
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-red-600 rounded-full p-2.5 transition-colors shadow-lg z-10"
            title="Cerrar"
          >
            <X size={24} strokeWidth={2.5}/>
          </button>

          <div 
            className="relative max-w-full max-h-full flex items-center justify-center gap-4 animate-in zoom-in duration-300 cursor-default overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt} 
              className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl border-2 border-white/20 select-none cursor-zoom-out"
              onClick={() => setSelectedPhoto(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Reacreditacion;