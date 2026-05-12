import React, {useEffect, useState} from 'react';
import { FolderOpen, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import SafeFileLink from '../components/controlErrorDocs/SafeFileLink';
import { getUploadUrl } from '../config/constans';

const AccidentesTrabajo = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/accidentes');
        const data = response.data;

        if (data.success) {
          setDocumentos(data.documentos);
        } else {
          toast.error(data.message || "Error al obtener archivos");
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        toast.error("No se pudo conectar con el servidor de archivos");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);
  // Lista de documentos
  // const documentos = [
  //   { titulo: "Unidad de salud Ocupacional y Gestión Ambiental", link: "http://10.5.131.63/intranet/Accidentes/USOAMBIENTAL.pdf" },
  //   { titulo: "Flujo de accidente trabajo", link: "http://10.5.131.63/intranet/Accidentes/FLUJOAT.pdf" },
  //   { titulo: "Flujo de accidente trabajo con exposición a fluidos", link: "http://10.5.131.63/intranet/Accidentes/FLUJO%20ACCIDENTES%20CON%20EXPOSICION%20A%20FLUIDOS%20CORPORALES%20(MUTUAL%202017).pdf" },
  //   { titulo: "DIAT", link: "http://10.5.131.63/intranet/Accidentes/DIAT-mutual.pdf" },
  //   { titulo: "Consentimiento informado VIH", link: "http://10.5.131.63/intranet/Accidentes/CONSENTIMIENTO%20VIH.PDF" },
  //   { titulo: "Rechazo de Atención", link: "http://10.5.131.63/intranet/Accidentes/Rechazo%20de%20Atenciones%20(MUTUAL).pdf" }
  // ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <PageHeader
        title={<>Accidentes <span className="text-orange-500">de Trabajo</span></>}
        subtitle="Documentos y procedimientos"
        badge="Documentos de la información"
        badgeIcon={FolderOpen}
        badgeIconColor="text-orange-500"
      />

      <div className="max-w-6xl mx-auto pt-4">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400 font-bold animate-pulse">
            <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            CARGANDO DOCUMENTOS...
          </div>
        ) : documentos.length === 0 ? (
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">No hay documentos registrados para esta sección</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentos.map((doc) => (
              < SafeFileLink
                key={doc.id}
                url={getUploadUrl(doc.url)}
                titulo={doc.titulo}
                groupHover="group-hover:bg-orange-500"
                hoverBorder='hover:border-orange-500'
              />
              // <li key={doc.id} className="flex items-center gap-3 group">
              //   <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-500 transition-colors"></span>
              //   <a
              //     href={`http://localhost:5000/uploads/${doc.url}`} 
              //     target="_blank"
              //     rel="noreferrer"
              //     className="text-xl md:text-2xl font-bold text-black hover:text-orange-600 underline underline-offset-4 decoration-1 transition-colors"
              //   >
              //     {doc.titulo}
              //   </a>
              // </li>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default AccidentesTrabajo;