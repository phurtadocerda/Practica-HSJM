import React, { useEffect, useState } from 'react';
import { Network, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Organigrama = () => {

  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/organigrama');
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
        title={<>Resolución Nuevo <span className="text-blue-800">Organigrama Institucional</span></>}
        icon={Network}
        iconBg="bg-blue-800"
        showBackButton={true}
        backPath="/inicio"
      />

      <div className="max-w-5xl mx-auto pt-4">

        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse">
            <div className="w-5 h-5 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
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

          documentos.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>

              <a 
                href={`http://localhost:5000/uploads/${doc.url}`}
                target="_blank" 
                rel="noreferrer" 
                className="text-2xl md:text-3xl font-bold text-black hover:text-blue-800 underline underline-offset-8 decoration-1 transition-colors uppercase"
              >
                {doc.titulo}
              </a>
            </div>
          ))

        )}

      </div>

    </section>
  );
};

export default Organigrama;