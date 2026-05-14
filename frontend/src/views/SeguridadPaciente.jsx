import React, { useEffect, useState } from 'react';
import { X, ZoomIn, PlayCircle, ShieldAlert, Loader2, AlertCircle, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import foto1 from '../assets/seguridad_foto1.png'; 
import foto2 from '../assets/seguridad_foto2.png';
import foto3 from '../assets/seguridad_foto3.png';
import foto4 from '../assets/seguridad_foto4.png';

const SeguridadPaciente = () => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/seguridad_paciente');
        if (response.data.success) {
          setArchivos(response.data.documentos || []);
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

  const documentos = archivos.filter(doc => !doc.url.toLowerCase().endsWith('.mp4'));
  const videos = archivos.filter(doc => doc.url.toLowerCase().endsWith('.mp4'));

  const fotosLocales = [
    { id: 1, src: foto1, alt: "Comprometidos con la seguridad" },
    { id: 2, src: foto2, alt: "Equipo de Calidad" },
    { id: 3, src: foto3, alt: "Semana de la Seguridad 1" },
    { id: 4, src: foto4, alt: "Semana de la Seguridad 2" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader 
        title="Semana de seguridad del paciente"
        subtitle="Compromiso y Prevención HSJM"
        badge="Calidad y Seguridad"
        badgeIcon={ShieldAlert}
        showBackButton={true}
        backPath="/accesos"           
        backLabel="VOLVER A ACCESOS"   
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECCIÓN DOCUMENTOS DINÁMICOS */}
        <div className="space-y-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          {loading ? (
            <div className="flex items-center gap-2 text-blue-400 animate-pulse font-bold">
              <Loader2 className="animate-spin" size={20} /> CARGANDO DOCUMENTOS...
            </div>
          ) : documentos.length === 0 ? (
            <p className="text-blue-300 italic text-sm">No hay minutas o instructivos cargados.</p>
          ) : (
            documentos.map((doc) => (
              <a 
                key={doc.id} 
                href={`http://localhost:5000/uploads/${doc.url}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-blue-700 font-bold underline hover:text-blue-900 text-lg group"
              >
                <FileText size={18} className="text-blue-400 group-hover:text-blue-700" />
                {doc.titulo}
              </a>
            ))
          )}
        </div>

        {/* GALERÍA DE FOTOS (LOCALES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fotosLocales.map((foto) => (
            <div 
              key={foto.id} 
              onClick={() => setSelectedPhoto(foto)} 
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg border-4 border-white transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <img src={foto.src} alt={foto.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white bg-black/50 p-3 rounded-full" size={50} />
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN VIDEOS DINÁMICOS */}
        <div className="pt-10">
          <div className="border-l-4 border-red-500 pl-4 mb-8">
            <h3 className="text-3xl font-black text-slate-800 uppercase italic">Galería de Videos</h3>
          </div>
          
          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold animate-pulse">
              CARGANDO VIDEOS...
            </div>
          ) : videos.length === 0 ? (
            <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No se han registrado cápsulas de video</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((vid) => (
                <div key={vid.id} className="space-y-3 group">
                  <div className="flex items-center gap-2 text-slate-700 font-bold uppercase text-s tracking-tighter">
                    <PlayCircle size={18} className="text-red-500" />
                    {vid.titulo}
                  </div>
                  <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 group-hover:border-red-100 transition-colors">
                    <video src={`http://localhost:5000/uploads/${vid.url}`} controls className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VISOR DE FOTOS (MODAL MEDIANO) */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center p-6 animate-in fade-in duration-300 backdrop-blur-sm cursor-zoom-out" 
          onClick={() => setSelectedPhoto(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10">
            <X size={32} strokeWidth={1.5} />
          </button>
          <div 
            className="relative flex items-center justify-center animate-in zoom-in duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              className="max-w-[85%] max-h-[65vh] object-contain rounded-3xl shadow-2xl border border-white/5 select-none cursor-zoom-out" 
              alt="Foto grande" 
              onClick={() => setSelectedPhoto(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SeguridadPaciente;