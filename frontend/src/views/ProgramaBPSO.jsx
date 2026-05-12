import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Importación de fotos locales (fijas)
import foto1 from '../assets/afiche_bpso.png'; 
import foto2 from '../assets/foto_bpso_2.png'; 
import foto3 from '../assets/foto_bpso_3.png'; 

const ProgramaBPSO = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/bpso');
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

  // Función de filtrado para el enlace destacado
  const filtrarDocs = (palabrasClave) => {
    return documentos.filter(doc => {
      const tituloNormalizado = doc.titulo.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      return palabrasClave.some(p => {
        const palabraNormalizada = p.toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return tituloNormalizado.includes(palabraNormalizada);
      });
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-white rounded-[3rem]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest">Cargando Programa BPSO...</p>
      </div>
    );
  }

  // Obtenemos el documento específico para el botón final
  const docClasificacion = filtrarDocs(["SISTEMA DE CLASIFICACION", "LESIONES POR PRESION"])[0];

  return (
    <section className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Programa BPSO"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 pt-4">
        
        {/* FOTOS FIJAS */}
        <div className="w-full max-w-xl">
          <img 
            src={foto1} 
            alt="Afiche BPSO" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        <div className="w-full max-w-xl">
          <img 
            src={foto2} 
            alt="Actividad BPSO 1" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        <div className="w-full max-w-xl">
          <img 
            src={foto3} 
            alt="Actividad BPSO 2" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        {/* ENLACE DINÁMICO FINAL */}
        <div className="w-full pt-8 pb-4 border-t border-slate-200 flex justify-center mt-2">
          {docClasificacion ? (
            <a 
              href={`http://localhost:5000/uploads/${docClasificacion.url}`} 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-50 px-6 py-4 rounded-2xl w-full max-w-xl text-center text-[#003876] font-bold text-lg md:text-xl underline underline-offset-4 hover:text-[#00a19a] hover:bg-slate-100 transition-all uppercase shadow-sm border border-slate-200 block"
            >
              {docClasificacion.titulo}
            </a>
          ) : (
            <div className="bg-slate-50 px-6 py-4 rounded-2xl w-full max-w-xl text-center text-slate-300 italic text-sm border border-slate-100">
              Documento de clasificación no disponible
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProgramaBPSO;