import React, { useEffect, useState } from 'react';
import { FileText, Download, FolderOpen, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ReglamentoInterno = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/reglamentointerno');
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

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Reglamento Interno Hsjm."
        subtitle="Hospital San José de Melipilla"
        badge={"Documento de la información"}
        badgeIcon={FolderOpen}
        icon={FileText}
        iconBg="bg-blue-600"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CUERPO DE LA PÁGINA */}
      <div className="max-w-5xl mx-auto pt-10">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            OBTENIENDO REGLAMENTO...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400">
            <AlertCircle size={24} />
            <p className="font-bold uppercase tracking-widest text-sm">No se ha subido el reglamento interno aún</p>
          </div>
        ) : (
          <div className="space-y-8">
            {documentos.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 group">
                <a
                  href={`http://localhost:5000/uploads/${doc.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl md:text-3xl font-bold text-black hover:text-blue-700 underline underline-offset-8 decoration-1 transition-colors"
                >
                  {doc.titulo}
                </a>
                <Download size={24} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-40 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Hospital San José de Melipilla - {documentos.length} Documentos oficiales
        </p>
      </div>

    </section>
  );
};

export default ReglamentoInterno;