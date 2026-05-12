import React, { useEffect, useState } from 'react';
import { FileText, ClipboardList, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ProtocolosOrdenes = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/protocolos_ordenes');
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
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      <PageHeader 
        title={<>Protocolos y <span className="text-cyan-600">Órdenes</span></>}
        subtitle="Hospital San José de Melipilla"
        badge="Protocolos y Órdenes"
        badgeIcon={FileText}
        icon={ClipboardList}
        iconBg="bg-cyan-600"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-5xl mx-auto pt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-400 font-bold animate-pulse">
            <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
            CARGANDO PROTOCOLOS...
          </div>
        ) : documentos.length === 0 ? (
       
          <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm md:text-base">
              No hay documentos de Protocolos y Órdenes disponibles en este momento.
            </p>
          </div>
   
        ) : (
          <ul className="space-y-6 pl-4 md:pl-10">
            {documentos.map((doc) => (
              <li key={doc.id} className="list-none group">
                <a 
                  href={`http://localhost:5000/uploads/${doc.url}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-4 w-fit"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-cyan-500 transition-colors shrink-0"></span>
                  <span className="text-blue-700 font-bold underline underline-offset-4 decoration-slate-200 group-hover:text-cyan-600 group-hover:decoration-cyan-600 text-sm md:text-lg uppercase tracking-wide transition-all duration-300">
                    {doc.titulo}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Unidad de Protocolos y Órdenes - Hospital San José de Melipilla
        </p>
      </div>
    </section>
  );
};

export default ProtocolosOrdenes;