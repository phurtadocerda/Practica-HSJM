import React from 'react';
import { ChevronLeft, PlayCircle } from 'lucide-react';

const ProtocoloVigilancia = ({ onNavigate }) => {
  // Aquí están tus 2 videos MP4 directos del servidor
  const videos = [
    {
      titulo: "Evaluación de riesgos psicosociales (Mutual de Seguridad)",
      url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/Protocolo-de-Vigilancia-de-Riesgos-Psicosociales-en-el-Trabajo.mp4?_=1"
    },
    {
      titulo: "Protocolo de Vigilancia de Riesgos Psicosociales Parte 2",
      url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/Protocolo-de-Vigilancia-de-Riesgos-Psicosociales-en-el-Trabajo_2.mp4?_=2"
    }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER CON BOTÓN VOLVER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm"
          >
            <ChevronLeft size={18} /> VOLVER A ACCESOS
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
            Protocolo de Vigilancia
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10 pt-2">
        
        {/* TEXTO DESCRIPTIVO */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black text-[#003876] mb-4">Protocolo de vigilancia de riesgos psicosociales</h3>
          <p className="text-slate-700 font-medium text-lg leading-relaxed">
            Si eres funcionario del Hospital San José de Melipilla, te invitamos a sumarte al proceso de evaluación de riesgos psicosociales en el trabajo. Revisa más detalles de este proceso en este video compartido por Mutual de Seguridad.
          </p>
        </div>

        {/* SECCIÓN DE LOS 2 VIDEOS MP4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <PlayCircle className="text-red-600" size={24} />
                <h4 className="font-bold text-slate-800 uppercase text-sm tracking-widest leading-tight">{video.titulo}</h4>
              </div>
              
              <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                {/* Reproductor de Video Nativo para MP4 */}
                <video 
                  src={video.url} 
                  controls 
                  controlsList="nodownload"
                  className="w-full h-full object-cover bg-black"
                >
                  Tu navegador no soporta la reproducción de este video.
                </video>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProtocoloVigilancia;