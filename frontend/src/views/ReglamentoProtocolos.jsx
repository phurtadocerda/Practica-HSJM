import React, { useEffect, useState } from 'react';
import { ShieldCheck, FolderOpen, Download, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ReglamentoProtocolos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Usamos la categoría exacta de tu seed
        const response = await api.get('/documentos/reglamentointernoprotocolo');
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
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Reglamento Interno y Protocolos"
        subtitle="Hospital San José de Melipilla"
        badge={"Documento de la información"}
        badgeIcon={FolderOpen}
        icon={ShieldCheck}
        iconBg="bg-indigo-700"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CUERPO DINÁMICO */}
      <div className="max-w-5xl mx-auto pt-4">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse py-10">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-700" />
            CARGANDO INFORMACIÓN...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400">
            <AlertCircle size={24} />
            <p className="font-bold uppercase tracking-widest text-sm">No hay protocolos de resguardo registrados</p>
          </div>
        ) : (
          <div className="space-y-6">
            {documentos.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-700 transition-colors shrink-0"></span>
                <a
                  href={`http://localhost:5000/uploads/${doc.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl md:text-2xl font-bold text-black hover:text-indigo-700 underline underline-offset-8 decoration-1 transition-all break-words"
                >
                  {doc.titulo}
                </a>
                <Download size={20} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-40 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Hospital San José de Melipilla - {documentos.length} Documentos en sistema
        </p>
      </div>

    </section>
  );
};

export default ReglamentoProtocolos;