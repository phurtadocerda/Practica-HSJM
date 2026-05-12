import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ProtocoloAtencionUsuario = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/protocolo_usuario');
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

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <PageHeader
        title="Protocolo de Atención al Usuario"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CONTENIDO CENTRAL */}
      <div className="max-w-4xl mx-auto pt-4">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-[#003876] animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Cargando Protocolos...</p>
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No hay protocolos disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {documentos.map((doc) => (
              <a 
                key={doc.id}
                href={`http://localhost:5000/uploads/${doc.url}`} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between p-6 md:p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-[#00a19a] hover:bg-white transition-all shadow-sm hover:shadow-xl"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-[#003876]/5 p-4 rounded-2xl group-hover:bg-[#00a19a]/10 group-hover:-translate-y-1 transition-all shrink-0">
                    <FileText className="text-[#003876] group-hover:text-[#00a19a]" size={36} strokeWidth={1.5} />
                  </div>
                  
                  {/* Texto del Enlace Dinámico */}
                  <h3 className="text-xl md:text-2xl font-black text-slate-700 group-hover:text-[#003876] transition-colors underline decoration-2 decoration-transparent group-hover:decoration-[#00a19a] underline-offset-8">
                    {doc.titulo}
                  </h3>
                </div>
                <ExternalLink className="text-slate-300 group-hover:text-[#ffb81c] transition-colors hidden sm:block shrink-0" size={32} />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Unidad de Participación y Atención al Usuario - {documentos.length} Documentos
        </p>
      </div>
    </section>
  );
};

export default ProtocoloAtencionUsuario;