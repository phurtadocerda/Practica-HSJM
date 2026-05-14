import React, { useEffect, useState } from 'react';
import { Activity, Loader2, AlertCircle } from 'lucide-react'; 
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Tuberculosis = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/tuberculosis');
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

  const docsPrincipales = documentos.slice(0, 30);

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader 
        title="Programa de Tuberculosis"
        subtitle="Documentos y Protocolos Institucionales"
        badge="Programa de tuberculosis"
        badgeIcon={Activity}
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-5xl mx-auto space-y-12 pt-4">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-[#00a19a] animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Cargando material PROCET...</p>
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No hay documentos de tuberculosis registrados
            </p>
          </div>
        ) : (
          <>
            {/* BLOQUE DINÁMICO 1 */}
             <div className="pl-4">
              <ul className="space-y-4">
              {docsPrincipales.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-500 group-hover:border-[#00a19a] shrink-0 transition-colors"></div>
                  <a 
                    href={`http://localhost:5000/uploads/${doc.url}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-[#00a19a] transition-colors"
                  >
                    {doc.titulo}
                  </a>
                </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Programa de Control y Eliminación de la Tuberculosis (PROCET) - {documentos.length} Archivos
        </p>
      </div>
    </section>
  );
};

export default Tuberculosis;