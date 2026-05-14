import React, { useEffect, useState } from 'react';
import { BarChart3, FileText, FileSpreadsheet, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ProduccionEstadistica = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/estadisticas');
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
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader
        title={<>Producción – <span className="text-[#003876]">Estadísticas</span></>}
        subtitle="Registro de Actividades e Indicadores Hospitalarios"
        badge="Control de Gestión"
        badgeIcon={FileSpreadsheet}
        icon={BarChart3}
        iconBg="bg-blue-600"
        showBackButton={true}
        backPath="/inicio"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-400 font-bold animate-pulse">
            <Loader2 className="w-8 h-8 text-[#003876] animate-spin" />
            CARGANDO REGISTROS...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">No hay registros estadísticos cargados</p>
          </div>
        ) : (
          <ul className="space-y-6 pl-4 md:pl-10">
            {documentos.map((doc) => (
              <li key={doc.id} className="list-none group">
                <a 
                  href={`http://localhost:5000/uploads/${doc.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col md:flex-row md:items-center gap-4 w-fit"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[#00a19a] transition-colors shrink-0"></span>
                    <span className="text-slate-800 font-bold underline decoration-slate-300 group-hover:decoration-[#00a19a] group-hover:text-[#00a19a] underline-offset-4 transition-all text-lg tracking-wide break-words">
                      {doc.titulo}
                    </span>
                    
                    
                    {doc.titulo.toLowerCase().includes('manual') && (
                      <span className="text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter">
                        Manual
                      </span>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Información oficial del Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default ProduccionEstadistica;