import React, { useEffect, useState } from 'react';
import { FileText, FolderOpen, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Resoluciones = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Llamada a la categoría 'resoluciones'
        const response = await api.get('/documentos/resoluciones');
        const data = response.data;

        if (data.success) {
          setDocumentos(data.documentos || []);
        } else {
          toast.error(data.message || "Error al obtener resoluciones");
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
        title="Resoluciones Oficiales"
        subtitle="Documentación Legal y Protocolos Aprobados"
        badge={"Biblioteca"}
        badgeIcon={FolderOpen}
        icon={FileText}
        iconBg="bg-indigo-600"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* LISTADO DE RESOLUCIONES */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-indigo-50/30 p-8 md:p-10 rounded-3xl border border-indigo-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-indigo-100 pb-4">
            <FileText size={16} className="text-indigo-500" /> Resoluciones Vigentes
          </h3>
          
          {loading ? (
            <div className="flex items-center gap-3 py-4 text-slate-400 font-bold animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              CARGANDO DOCUMENTOS LEGALES...
            </div>
          ) : documentos.length === 0 ? (
            <div className="flex items-center gap-2 py-4 text-slate-400 italic">
              <AlertCircle size={18} />
              No se han encontrado resoluciones registradas.
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
                    <span className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-600 transition-colors shrink-0"></span>
                    <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-indigo-500 group-hover:text-indigo-800 underline-offset-4 transition-all text-sm md:text-base tracking-wide">
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
          Documentación Oficial - Hospital San José de Melipilla - {documentos.length} Resoluciones
        </p>
      </div>

    </section>
  );
};

export default Resoluciones;