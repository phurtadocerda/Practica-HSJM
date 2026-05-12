import React, { useEffect, useState } from 'react';
import { PlayCircle, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ProtocoloVigilancia = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/protocolo_vigilancia');
        const data = response.data;

        if (data.success) {
          setDocumentos(data.documentos || []);
        } else {
          toast.error(data.message || "Error al obtener archivos");
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

  // Filtramos solo los videos (.mp4)
  const videos = documentos.filter(doc => doc.url.toLowerCase().endsWith('.mp4'));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-white rounded-[3rem]">
        <Loader2 className="w-12 h-12 text-[#003876] animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest">Cargando Vigilancia...</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Protocolo de Vigilancia"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-6xl mx-auto space-y-10 pt-2">
        
        {/* TEXTO DESCRIPTIVO */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black text-[#003876] mb-4 uppercase italic tracking-tighter">Protocolo de vigilancia de riesgos psicosociales</h3>
          <p className="text-slate-700 font-medium text-lg leading-relaxed">
            Si eres funcionario del Hospital San José de Melipilla, te invitamos a sumarte al proceso de evaluación de riesgos psicosociales en el trabajo. Revisa más detalles de este proceso en este video compartido por Mutual de Seguridad.
          </p>
        </div>

        {/* SECCIÓN DE VIDEOS DINÁMICOS */}
        {videos.length === 0 ? (
          <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center max-w-4xl mx-auto">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm md:text-base">
              No hay videos de vigilancia registrados en el sistema
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
            {videos.map((video) => (
              <div key={video.id} className="flex flex-col gap-4 group transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <PlayCircle className="text-red-600" size={24} />
                  <h4 className="font-bold text-slate-800 uppercase text-sm tracking-widest leading-tight">
                    {video.titulo}
                  </h4>
                </div>
                
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                  <video 
                    src={`http://localhost:5000/uploads/${video.url}`} 
                    controls 
                    controlsList="nodownload"
                    className="w-full h-full object-cover"
                  >
                    Tu navegador no soporta la reproducción de este video.
                  </video>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Unidad de Salud Ocupacional - {videos.length} Videos en sistema
        </p>
      </div>
    </section>
  );
};

export default ProtocoloVigilancia;