import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import aficheMpox from '../assets/viruela.png'; 

const ViruelaDelMono = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/viruela_mono');
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
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      <PageHeader
        title="Viruela del Mono"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-5xl mx-auto space-y-8 pt-4">
        
        {loading ? (
          <div className="flex items-center gap-3 py-10 text-slate-400 font-bold animate-pulse">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            CARGANDO INFORMACIÓN MPOX...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              No hay documentos registrados para esta categoría
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {documentos.map((doc) => (
              <li key={doc.id} className="flex items-start gap-3 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-[#00a19a] shrink-0" />
                <a 
                  href={`http://localhost:5000/uploads/${doc.url}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-700 font-bold underline underline-offset-4 decoration-slate-300 hover:text-blue-700 hover:decoration-blue-700 transition-all text-sm md:text-base uppercase tracking-tight"
                >
                  {doc.titulo}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* IMAGEN INFORMATIVA INFERIOR (Assets locales) */}
        <div className="pt-10 flex justify-start">
          <div className="max-w-md rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100 bg-white p-2">
             <img src={aficheMpox} alt="Mpox Informativo" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Vigilancia Epidemiológica - Hospital San José de Melipilla
        </p>
      </div>
    </section>
  );
};

export default ViruelaDelMono;