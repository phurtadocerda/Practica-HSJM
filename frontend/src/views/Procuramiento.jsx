import React, { useEffect, useState } from 'react';
import { Heart, FileText, Video, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Procuramiento = () => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        
        const response = await api.get('/documentos/procuramiento');
        const data = response.data;

        if (data.success) {
          setArchivos(data.documentos || []);
        } else {
          toast.error(data.message || "Error al obtener archivos");
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        toast.error("No se pudo conectar con el servidor de archivos");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  
  const documentos = archivos.filter(doc => !doc.url.toLowerCase().endsWith('.mp4'));
  const videos = archivos.filter(doc => doc.url.toLowerCase().endsWith('.mp4'));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-white rounded-[3rem]">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest">Cargando Procuramiento...</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in duration-500">
      
      <PageHeader
        title={<>Procura<span className="text-rose-500">miento</span></>}
        subtitle="Donación de Órganos y Tejidos"
        icon={Heart}
        iconBg="bg-rose-500"
        showBackButton={true}
        backPath="/inicio"
      />

      <div className="max-w-5xl mx-auto space-y-12">
        

        <div className="bg-rose-50/30 p-6 md:p-8 rounded-3xl border border-rose-100/50">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-rose-100 pb-4">
            <FileText size={16} className="text-rose-500" /> Material de Estudio
          </h3>
          
          {documentos.length === 0 ? (
            <div className="py-4 text-slate-400 italic text-sm flex items-center gap-2">
              <AlertCircle size={16} /> No hay documentos (PPTX/PDF) en esta categoría.
            </div>
          ) : (
            <ul className="space-y-4 pl-2">
              {documentos.map((doc) => (
                <li key={doc.id} className="list-none group">
                  <a 
                    href={`http://localhost:5000/uploads/${doc.url}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-700 font-bold underline decoration-slate-200 hover:text-rose-600 hover:decoration-rose-500 transition-all text-lg leading-tight block"
                  >
                    {doc.titulo}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

       
        <div className="space-y-8">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Video size={16} className="text-rose-500" /> Clases Grabadas
          </h3>
          
          {videos.length === 0 ? (
            <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest">No se detectaron videos (.mp4)</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid) => (
                <div key={vid.id} className="flex flex-col bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-200 group transition-transform hover:-translate-y-1">
                  <div className="aspect-video bg-black relative">
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      src={`http://localhost:5000/uploads/${vid.url}`} 
                    >
                      Tu navegador no soporta el formato de video.
                    </video>
                  </div>
                  <div className="p-5 bg-white border-t border-slate-100">
                    <p className="text-slate-800 font-bold uppercase text-sm tracking-tight">
                       Video: {vid.titulo} 
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

     

    </section>
  );
};

export default Procuramiento;