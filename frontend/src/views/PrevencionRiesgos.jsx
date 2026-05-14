import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import imgProcedimiento from '../assets/foto_procedimiento.jpg'; 
import imgCarpeta from '../assets/foto_carpeta.png'; 
import imgMutual from '../assets/foto_mutual.png'; 
import imgCeal from '../assets/foto_ceal.jpg'; 
import imgTmert from '../assets/foto_tmert.jpg'; 
import imgPrexor from '../assets/foto_prexor.png'; 
import imgPlanEmergencia from '../assets/foto_plan_emergencia.png'; 
import imgLeyKarinInterno from '../assets/foto_karin_interno.jpg'; 
import imgLeyKarinExterno from '../assets/foto_karin_externo.png'; 
import imgLeyKarinPrevencion from '../assets/foto_karin_prevencion.png'; 

const PrevencionRiesgos = () => { 
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/prevencion');
        const data = response.data;
        if (data.success) {
          setDocumentos(data.documentos || []);
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


  const ListaFiltrada = ({ palabras }) => {
    const docsEncontrados = filtrarDocs(palabras);
    
    if (docsEncontrados.length === 0) {
      return <span className="text-slate-300 text-[10px] italic uppercase">No hay archivos</span>;
    }

    return (
      <ul className="space-y-2">
        {docsEncontrados.map(doc => (
          <li key={doc.id} className="flex items-start gap-2 group">
            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 group-hover:bg-orange-500 shrink-0"></div>
            <a 
              href={`http://localhost:5000/uploads/${doc.url}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-800 underline underline-offset-4 hover:text-blue-700 transition-colors text-sm font-medium leading-tight"
            >
              {doc.titulo}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-[3rem]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest">Cargando Prevención de Riesgos...</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Prevención de Riesgos"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-6xl mx-auto space-y-16 pt-4">
        

        <div>
          <p className="text-slate-600 mb-4 text-lg font-bold">Descargar los siguientes Archivos:</p>
          <div className="pl-4">
            <ListaFiltrada palabras={["Politica", "REGLAMENTO", "Plan Programa"]} />
          </div>
        </div>


        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">Accidentes y Enfermedades Profesionales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Procedimientos accidentes de trabajo</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Documentos en caso de accidente y/o enfermedad profesional</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Horarios de atencion y Flujo de derivacion a Mutual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48">
                    <img src={imgProcedimiento} alt="Procedimientos" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgCarpeta} alt="Documentos" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgMutual} alt="Mutual de Seguridad" className="max-h-24 mx-auto object-contain" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["actuacion frente"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["DIAT", "DIEP", "Rechazo", "VIH"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["Horario", "derivacion"]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

 
        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">Protocolos Minsal</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Protocolo Psicosocial</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Protocolo TMERT</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Protocolo PREXOR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgCeal} alt="CEAL-SM" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgTmert} alt="TMERT" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgPrexor} alt="PREXOR" className="max-h-32 mx-auto object-contain" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["CEAL-SM", "Resultados"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["TMERT", "Difusion para funcionarios"]} />

                    <ListaFiltrada palabras={["TMERT", "Tríptico difusión"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["prexor", "Ruido"]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">COGRID (Comité gestión de riesgos y desastres)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Plan de emergencia</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top"></th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgPlanEmergencia} alt="Plan de Emergencias" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 bg-white h-48"></td>
                  <td className="border border-slate-300 p-6 bg-white h-48"></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["EMERGENCIA 2023"]} />
                  </td>
                  <td className="border border-slate-300 p-6 bg-white"></td>
                  <td className="border border-slate-300 p-6 bg-white"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">Prevención de la violencia, acoso Laboral y/o Sexual</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Ley 21.643 "Ley Karin" Interno</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Ley 21.643 "Ley Karin" Externo</th>
                  <th className="border border-slate-300 p-4 text-left text-slate-700 font-bold w-1/3 align-top">Prevención violencia, acoso laboral y/o sexual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgLeyKarinInterno} alt="Ley Karin Interno" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgLeyKarinExterno} alt="Ley Karin Externo" className="max-h-32 mx-auto object-contain" />
                  </td>
                  <td className="border border-slate-300 p-6 align-middle text-center bg-white h-48 border-b-2 border-b-teal-600">
                    <img src={imgLeyKarinPrevencion} alt="Ley Karin Prevención" className="max-h-32 mx-auto object-contain" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["denuncia", "APT"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["F.A.F"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ListaFiltrada palabras={["AS-AL-VT", "buenas practicas", "conciliacion"]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 

        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">Actividades Realizadas</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3">
                    <ListaFiltrada palabras={["extintor", "dosimetros"]} />
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3"></td>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-slate-300 font-bold mt-10 uppercase tracking-[0.4em]">
        Total Archivos: {documentos.length}
      </div>
    </section>
  );
};

export default PrevencionRiesgos;