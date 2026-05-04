import React from 'react';
import { FileText, PlayCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AgendamientoGis = () => {

  // === LINKS DE LOS MANUALES (PDF) ===
  const manuales = [
    { titulo: "Ingresar Interconsultas", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Ingresar-Interconsultas.pdf" },
    { titulo: "Estado de Solicitudes", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Estado-de-Solicitudes.pdf" },
    { titulo: "Nóminas de Atención", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Nominas-de-Atencion.pdf" },
    { titulo: "Profesionales", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Profesionales.pdf" },
  ];

  // === LINKS DE LOS VIDEOS (MP4) ===
  const videosSecundarios = [
    { titulo: "Tutorial 1", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Agendar-Pacientes.mp4?_=1" },
    { titulo: "Tutorial 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Bloqueo-y-recuperacion-de-agendas.mp4?_=2" },
    { titulo: "Tutorial 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Copiar-Nominas-de-Atencion.mp4?_=3" },
    { titulo: "Tutorial 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Crear-Agendas.mp4?_=4" },
    { titulo: "Tutorial 5", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Definir-Ausencias-Medicas.mp4?_=5" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <PageHeader
        title={<>Manuales <span className="text-cyan-600">Agendamiento GIS</span></>}
        subtitle="Documentación y tutoriales"
      />
    
      <div className="max-w-6xl mx-auto space-y-16">
        {/* SECCIÓN 1: MANUALES (LISTA DE ENLACES) */}
        <div>
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="text-[#00a19a]" size={28} /> Manuales:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manuales.map((manual, index) => (
              <a 
                key={index}
                href={manual.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#00a19a] hover:bg-white transition-all group shadow-sm hover:shadow-md"
              >
                <div className="w-2 h-2 rounded-full border-2 border-slate-400 group-hover:border-[#00a19a] group-hover:bg-[#00a19a] shrink-0 transition-colors"></div>
                <span className="font-bold text-slate-700 underline underline-offset-4 group-hover:text-[#003876] transition-colors">
                  {manual.titulo}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* SECCIÓN 2: VIDEOS TUTORIALES */}
        <div>
          <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2 border-t pt-10 border-slate-100">
            <PlayCircle className="text-red-500" size={28} /> Videos Tutoriales:
          </h3>

          {/* Grilla de Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videosSecundarios.map((video, index) => (
              <div key={index} className="space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <video 
                    src={video.url} 
                    controls 
                    className="w-full h-full object-cover"
                  >
                    Tu navegador no soporta el video.
                  </video>
                </div>
                <p className="font-bold text-slate-700 text-center uppercase text-sm">
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

export default AgendamientoGis;