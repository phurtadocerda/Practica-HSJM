import React, { useEffect, useState } from 'react';
import { Calendar, FileText, FolderOpen, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const PlanAnualCCU = () => {

  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/plan_anual_ccu');
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
        title={<>Plan Anual <span className="text-sky-500">2024 CCU</span></>}
        subtitle="Consejo Consultivo de Usuarios"
        badge="Biblioteca"
        badgeIcon={FolderOpen}
        icon={Calendar}
        iconBg="bg-sky-500"
        showBackButton={true}
        backPath="/inicio"
      />

      <div className="max-w-5xl mx-auto">
        <div className="bg-sky-50/30 p-8 md:p-10 rounded-3xl border border-sky-100/50 shadow-sm">
          
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-sky-100 pb-4">
            <FileText size={16} className="text-sky-500" /> Informe de Acuerdos
          </h3>

          {loading ? (
            <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse">
              <div className="w-5 h-5 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              CARGANDO DOCUMENTOS...
            </div>

          ) : documentos.length === 0 ? (

            <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest">
                No hay documentos registrados para esta sección
              </p>
            </div>

          ) : (

            <ul className="space-y-6 pl-2 md:pl-4">
              {documentos.map((doc) => (
                <li key={doc.id} className="list-none group">
                  <a
                    href={`http://localhost:5000/uploads/${doc.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 w-fit"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-sky-500 transition-colors shrink-0"></span>

                    <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-sky-500 group-hover:text-sky-800 underline-offset-4 transition-all text-lg md:text-xl tracking-wide">
                      {doc.titulo}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

          )}

        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Documentación Oficial - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default PlanAnualCCU;