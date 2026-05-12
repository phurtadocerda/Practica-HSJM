import React, { useEffect, useState } from 'react';
import { ShieldAlert, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ReglamentoHigiene = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/reglamento_interno');
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
        title="Reglamento Interno Higiene, Seguridad y Medioambiente"
        subtitle="Hospital San José de Melipilla"
        icon={ShieldAlert}
        iconBg="bg-amber-500"
        showBackButton={true}
        backPath="/inicio"
      />

      <div className="max-w-5xl mx-auto pt-4 space-y-8">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse py-10">
            <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
            CARGANDO REGLAMENTOS...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              No hay documentos de reglamento registrados
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {documentos.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 group">
                <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-cyan-500 transition-colors shrink-0"></span>
                <a 
                  href={`http://localhost:5000/uploads/${doc.url}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-2xl md:text-3xl font-bold text-black hover:text-cyan-600 underline underline-offset-8 decoration-1 transition-colors uppercase break-words"
                >
                  {doc.titulo}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Prevención de Riesgos - {documentos.length} Archivos en sistema
        </p>
      </div>
    </section>
  );
};

export default ReglamentoHigiene;