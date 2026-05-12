import React, { useEffect, useState } from 'react';
import { AlertCircle, FileText, PlayCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import SafeVideoPlayer from '../components/controlErrorDocs/SaveVideoplayer';
import SafeFileLink from '../components/controlErrorDocs/SafeFileLink';
import { getUploadUrl } from '../config/constans';

const AgendamientoGis = () => {

  // === LINKS DE LOS MANUALES (PDF) ===
  // const manuales = [
  //   { titulo: "Ingresar Interconsultas", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Ingresar-Interconsultas.pdf" },
  //   { titulo: "Estado de Solicitudes", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Estado-de-Solicitudes.pdf" },
  //   { titulo: "Nóminas de Atención", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Nominas-de-Atencion.pdf" },
  //   { titulo: "Profesionales", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Profesionales.pdf" },
  // ];

  // === LINKS DE LOS VIDEOS (MP4) ===
  // const videosSecundarios = [
  //   { titulo: "Tutorial 1", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Agendar-Pacientes.mp4?_=1" },
  //   { titulo: "Tutorial 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Bloqueo-y-recuperacion-de-agendas.mp4?_=2" },
  //   { titulo: "Tutorial 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Copiar-Nominas-de-Atencion.mp4?_=3" },
  //   { titulo: "Tutorial 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Crear-Agendas.mp4?_=4" },
  //   { titulo: "Tutorial 5", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/Definir-Ausencias-Medicas.mp4?_=5" },
  // ];

  const [manuales, setManuales] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        const [resManuales, resVideos] = await Promise.all([
          api.get('/documentos/agendamiento_gis_manual'),
          api.get('/documentos/agendamiento_gis_video')
        ]);

        if (resManuales.data.success) setManuales(resManuales.data.documentos);
        if (resVideos.data.success) setVideos(resVideos.data.documentos);

      } catch (error) {
        console.error("Error al cargar contenido GIS:", error);
        toast.error("No se pudo cargar el contenido. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    cargarContenido();
  }, []);

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">

      <PageHeader
        title={<>Manuales <span className="text-cyan-600">Agendamiento GIS</span></>}
        subtitle="Documentación y tutoriales"
      />

      <div className="max-w-6xl mx-auto space-y-16">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse">
            <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            CARGANDO DOCUMENTOS...
          </div>
        ) : (manuales.length === 0 && videos.length === 0) ? (
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 font-semibold">No se encontraron documentos o videos disponibles.</p>
          </div>
        ) : (
          <>
            {/* SECCIÓN 1: MANUALES (LISTA DE ENLACES) */}
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="text-[#00a19a]" size={28} /> Manuales:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {manuales.map((manual) => (
                  <SafeFileLink
                    key={manual.id}
                    url={getUploadUrl(manual.url)}
                    titulo={manual.titulo} />
                ))}
              </div>
            </div>
            {/* SECCIÓN 2: VIDEOS TUTORIALES */}
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2 border-t pt-10 border-slate-100">
                <PlayCircle className="text-red-500" size={28} /> Videos Tutoriales:
              </h3>

              {/* Grilla de Videos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <SafeVideoPlayer
                    key={video.id}
                    url={getUploadUrl(video.url)}
                    titulo={video.titulo}
                  />
                ))}
              </div>
            </div>
          </>
        )}



      </div>
    </section>
  );
};

export default AgendamientoGis;