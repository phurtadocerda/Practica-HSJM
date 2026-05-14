import React, { useEffect, useState } from 'react';
import { Activity, FolderOpen, Download, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const ReunionClinicaUrgencia = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {

        const response = await api.get('/documentos/reuniones');
        const data = response.data;

        if (data.success) {
          setDocumentos(data.documentos || []);
        } else {
          toast.error(data.message || "Error al obtener documentos");
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
        title={<>Reunión Clínica <span className="text-red-600">Urgencia</span></>}
        badge="Documento de la información"
        badgeIcon={FolderOpen}
        icon={Activity}
        iconBg="bg-red-600"
        showBackButton={true}
        backPath="/inicio" 
      />

      {/* CUERPO: LISTA DE DESCARGAS */}
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-700 font-black text-4xl mb-10 tracking-tight">Descargar Archivos:</h3>
        
        {loading ? (
          <div className="flex items-center gap-3 py-10 text-slate-400 font-bold animate-pulse">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            CARGANDO MATERIAL CLÍNICO...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No hay presentaciones de urgencia cargadas
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {documentos.map((doc) => (
              <li key={doc.id} className="group flex items-start gap-3">
                <div className="mt-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Download size={24} />
                </div>
                <a
                  href={`http://localhost:5000/uploads/${doc.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl md:text-2xl font-bold text-black hover:text-red-600 underline underline-offset-8 decoration-1 transition-all uppercase tracking-tight break-words"
                >
                  {doc.titulo}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-32 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Área Crítica - Hospital San José de Melipilla - {documentos.length} Archivos Disponibles
        </p>
      </div>

    </section>
  );
};

export default ReunionClinicaUrgencia;