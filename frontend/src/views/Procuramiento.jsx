import React from 'react';
import { ChevronLeft, Heart, FileText, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const Procuramiento = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook

  const documentos = [
    { titulo: "Clase proceso de donación y procuramiento de órganos y tejidos 2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/08/Clase-proceso-de-donacion-y-procuramiento-de-organos-y-tejidos-2023.pptx" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button
            onClick={() => navigate('/inicio')} // 4. CORRECCIÓN: Usamos navigate
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs shadow-sm"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-rose-500 p-3 rounded-2xl text-white shadow-lg">
              <Heart size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Procura<span className="text-rose-500">miento</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">
                Donación de Órganos y Tejidos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* DOCUMENTOS */}
        <div className="bg-rose-50/30 p-6 md:p-8 rounded-3xl border border-rose-100/50">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-rose-100 pb-4">
            <FileText size={16} className="text-rose-500" /> Material de Estudio
          </h3>
          <ul className="space-y-4 pl-2">
            {documentos.map((doc, idx) => (
              <li key={idx} className="list-none">
                <a href={doc.link} target="_blank" rel="noreferrer" className="text-slate-700 font-bold underline decoration-slate-200 hover:text-rose-600 hover:decoration-rose-500 transition-all text-lg">
                  {doc.titulo}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* VIDEOS / CLASES (AHORA FUNCIONALES) */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Video size={16} className="text-rose-500" /> Clases Grabadas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* VIDEO 1 */}
            <div className="flex flex-col bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <div className="aspect-video bg-black relative">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  // 🔥 AQUÍ PONES TU LINK AL VIDEO MP4 O WEBM 🔥
                  src="http://10.5.131.63/intranet/wp-content/uploads/2023/08/2018_El-mejor-regalo-de-la-vida_Minsal.mp4?_=1" 
                >
                  Tu navegador no soporta el formato de video.
                </video>
              </div>
            </div>

            {/* VIDEO 2 */}
            <div className="flex flex-col bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <div className="aspect-video bg-black relative">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  // 🔥 AQUÍ PONES TU LINK AL VIDEO MP4 O WEBM 🔥
                  src="http://10.5.131.63/intranet/wp-content/uploads/2023/08/EN-EL-LADO-DE-LA-VIDA.mp4?_=2" 
                >
                  Tu navegador no soporta el formato de video.
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Procuramiento;