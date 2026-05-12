import React, { useEffect, useState } from 'react';
import { Youtube, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Midas = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/midas');
        if (response.data.success) {
          setDocumentos(response.data.documentos || []);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        toast.error("No se pudo conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Los videos de YouTube se mantienen fijos ya que son embebidos
  const videosYouTube = [
    { titulo: "TUTORIAL USO DE PLATAFORMA", url: "https://www.youtube.com/embed/jzfQxqunuOQ" },
    { titulo: "TUTORIAL BANDEJA DE ALARMAS ", url: "https://www.youtube.com/embed/525zklJJy6A" },
    { titulo: "TUTORIAL DE USO GENERAL DE LA PLATAFORMA ", url: "https://www.youtube.com/embed/KdJDzwF13CE" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Midas"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-5xl mx-auto space-y-12 pt-2">
        
        {/* LISTA DE DOCUMENTOS DINÁMICOS */}
        <div className="pl-2">
          {loading ? (
            <div className="flex items-center gap-3 py-6 text-slate-400 font-bold animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              CARGANDO DOCUMENTACIÓN MIDAS...
            </div>
          ) : documentos.length === 0 ? (
            <div className="flex items-center gap-2 text-slate-300 italic text-sm py-4">
              <AlertCircle size={18} /> No hay documentos registrados para Midas.
            </div>
          ) : (
            <ul className="space-y-4">
              {documentos.map((doc) => (
                <li key={doc.id} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full border-[1.5px] border-slate-800 shrink-0"></div>
                  <a 
                    href={`http://localhost:5000/uploads/${doc.url}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-blue-700 transition-colors uppercase"
                  >
                    {doc.titulo}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SEPARADOR VISUAL */}
        <hr className="border-slate-200" />

        {/* SECCIÓN DE TUTORIALES YOUTUBE */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-8">
            <Youtube className="text-red-600" size={28} />
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Tutoriales Midas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videosYouTube.map((video, index) => (
              <div key={index} className="flex flex-col gap-3 group">
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-md border border-slate-200 group-hover:shadow-xl group-hover:border-red-100 transition-all">
                  <iframe 
                    src={video.url} 
                    title={video.titulo}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="font-bold text-slate-700 uppercase text-[11px] px-1 border-l-4 border-red-500 pl-2 leading-tight">
                  {video.titulo}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Midas;