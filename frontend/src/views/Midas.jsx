import React from 'react';
import { Youtube } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Midas = () => {
  // Lista de documentos
  const documentos = [
    { name: "DECRETO 1 REGLAMENTO DE PREVENCIÓN Y CONTROL DE LA RABIA EN EL HOMBRE Y EN LOS ANIMALES", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/11/DECREO-1-REGLAMENTO-DE-PREVENCION-Y-CONTROL-DE-LA-RABIA-EN-EL-HOMBRE-Y-EN-LOS-ANIMALES.pdf" },
    { name: "GLOSA ICONOGRAFICA", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/10/GLOSA-ICONOGRAFICA.pdf" },
    { name: "MANUAL MORDEDORES ESTABLECIMIENTOS DE SALUD 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/10/MANUAL-MORDEDORES-ESTABLECIMIENTOS-DE-SALUD-2024.pdf" },
    { name: "FICHA NOTIFICACION DE MORDEDORES", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/10/FICHA-NOTIFICACION-DE-MORDEDORES.pdf" },
    { name: "Flujograma Rabia 2025 HSJM", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/Flujograma-Rabia-2025-HSJM.pdf" },
  ];

  const videos = [
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
        
        {/* LISTA DE DOCUMENTOS */}
        <div className="pl-2">
          <ul className="space-y-4">
            {documentos.map((doc, index) => (
              <li key={index} className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full border-[1.5px] border-slate-800 shrink-0"></div>
                <a 
                  href={doc.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-blue-700 transition-colors uppercase"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SEPARADOR VISUAL */}
        <hr className="border-slate-200" />

        {/* SECCIÓN DE 3 VIDEOS */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-8">
            <Youtube className="text-red-600" size={28} />
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Tutoriales Midas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-md border border-slate-200">
                  <iframe 
                    src={video.url} 
                    title={video.titulo}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="font-bold text-slate-700 uppercase text-sm px-1 border-l-4 border-red-500 pl-2">
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