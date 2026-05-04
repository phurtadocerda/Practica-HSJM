import React from 'react';
import { Heart, FileText, Video } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Procuramiento = () => {
  const documentos = [
    { titulo: "Clase proceso de donación y procuramiento de órganos y tejidos 2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/08/Clase-proceso-de-donacion-y-procuramiento-de-organos-y-tejidos-2023.pptx" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title={<>Procura<span className="text-rose-500">miento</span></>}
        subtitle="Donación de Órganos y Tejidos"
        icon={Heart}
        iconBg="bg-rose-500"
        showBackButton={true}
        backPath="/inicio"
      />

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