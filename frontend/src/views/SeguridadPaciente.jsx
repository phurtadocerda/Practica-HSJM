import React, { useState } from 'react';
import { X, ZoomIn, PlayCircle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import foto1 from '../assets/seguridad_foto1.png'; 
import foto2 from '../assets/seguridad_foto2.png';
import foto3 from '../assets/seguridad_foto3.png';
import foto4 from '../assets/seguridad_foto4.png';

const SeguridadPaciente = () => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fotos = [
    { id: 1, src: foto1, alt: "Comprometidos con la seguridad" },
    { id: 2, src: foto2, alt: "Equipo de Calidad" },
    { id: 3, src: foto3, alt: "Semana de la Seguridad 1" },
    { id: 4, src: foto4, alt: "Semana de la Seguridad 2" },
  ];

  const videos = [
    { id: 1, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/CAPSULA-MARIA-ELENA-OK.mp4?_=2", titulo: "Video Seguridad 1" },
    { id: 2, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/CAPSULA-MARIA-ELENA-OK.mp4?_=2", titulo: "Video Seguridad 2" },
    { id: 3, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/CAPSULA-IVANKA-OK.mp4?_=3", titulo: "Video Seguridad 3" },
    { id: 4, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/CAPSULA-FELIPE-OK.mp4?_=4", titulo: "Video Seguridad 4" },
    { id: 5, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/CAPSULA-JORGE-OK.mp4?_=5", titulo: "Video Seguridad 5" },
    { id: 6, url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/Capsula-Medicacion-HSJM.mp4?_=6", titulo: "Video Seguridad 6" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
  
      <PageHeader 
        title="Semana de seguridad del paciente"
        subtitle="Compromiso y Prevención HSJM"
        badge="Calidad y Seguridad"
        badgeIcon={ShieldAlert}
        backPath="/accesos"           
        backLabel="VOLVER A ACCESOS"   
      />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <a href="http://10.5.131.63/intranet/wp-content/uploads/2022/09/Minuta-para-los-Servicios-de-Salud-y-Establecimientos.pdf" target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline hover:text-blue-900 block text-lg">
            Minuta para los Servicios de Salud y Establecimientos
          </a>
          <a href="http://10.5.131.63/intranet/wp-content/uploads/2022/09/10-correctos.pdf" target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline hover:text-blue-900 block text-lg">
            10 correctos
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fotos.map((foto) => (
            <div key={foto.id} onClick={() => setSelectedPhoto(foto)} className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg border-4 border-white transition-all hover:shadow-2xl hover:-translate-y-1">
              <img src={foto.src} alt={foto.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white bg-black/50 p-3 rounded-full" size={50} />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-10">
          <div className="border-l-4 border-red-500 pl-4 mb-8">
            <h3 className="text-3xl font-black text-slate-800 uppercase italic">Galería de Videos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((vid) => (
              <div key={vid.id} className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 font-bold uppercase text-sm">
                  <PlayCircle size={20} className="text-red-500" />
                  {vid.titulo}
                </div>
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
                  <video src={vid.url} controls className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300 backdrop-blur-sm cursor-zoom-out" onClick={() => setSelectedPhoto(null)}>
          <button className="absolute top-6 right-6 text-white bg-black/50 p-3 rounded-full hover:bg-red-600 transition-colors"><X size={30} /></button>
          <img src={selectedPhoto.src} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300" alt="Foto grande" />
        </div>
      )}
    </section>
  );
};

export default SeguridadPaciente;