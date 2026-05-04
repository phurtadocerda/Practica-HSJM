import React from 'react';
import PageHeader from '../components/PageHeader';
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

  const descargasSuperiores = [
    { name: "Política de Seguridad y Salud en el trabajo SSMMOCC 2025", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/08/Politica_de_seguridad_y_Salud_en_el_trabajo_SSMOCC_20251.pdf" },
    { name: "REGLAMENTO-INTERNO-2026-Nº994", url: "http://10.5.131.63/intranet/wp-content/uploads/2026/01/994-Reglamento-Interno-Higiene-y-Seguridad.pdf" },
    { name: "Plan Programa trabajo prevención de riesgos HSJM 2025", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/PLAN-PROGRAMA-TRABAJO-PREVENCION-DE-RIESGOS-HSJM-2025.pdf" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Prevención de Riesgos"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-6xl mx-auto space-y-16 pt-4">
        
        {/* PARTE SUPERIOR: LISTA DE DESCARGAS */}
        <div>
          <p className="text-slate-600 mb-4 text-lg">Descargar los siguientes Archivos:</p>
          <ul className="space-y-3 pl-4">
            {descargasSuperiores.map((doc, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div>
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-blue-700 transition-colors"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* TABLA 1: ACCIDENTES Y ENFERMEDADES PROFESIONALES */}
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
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div>
                        <a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/PROCEDIMIENTO_ACTUACION_ANTE_ACCIDENTES1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Procedimiento actuación frente a la ocurrencia de accidentes de trabajo</a>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/DIAT1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Formulario DIAT</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/DIEP1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Formulario DIEP</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Rechazo_de_Atenciones_MUTUAL1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Rechazo de atención</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/CONSENTIMIENTO_INFORMADO_VIH_MUTUAL1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Consentimiento informado VIH</a></li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Horario_de_atencion1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Horario de atención</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-800 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/11/FLUJO-DE-DERIVACION.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Flujo de derivación</a></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA 2: PROTOCOLOS MINSAL */}
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
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div>
                        <a href="http://10.5.131.63/intranet/wp-content/uploads/2025/11/PPT-RESULTADOS-CEAL-SM-2024.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Resultados CEAL-SM 2024</a>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Difusion_para_funcionarios_TMERT1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Difusión para funcionarios</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/TRIPTICO_DIFUSION_TMERT1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Tríptico difusión</a></li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/09/ppt-difusion-y-capacitacion-de-prexor-v2021.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Difusión y capacitación de prexor</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/09/ficha-ruido-v4.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Fecha Ruido</a></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA 3: COGRID */}
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
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div>
                        <a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/RESOLUCION-PLAN-DE-EMERGENCIA-2023.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700 uppercase">RESOLUCION PLAN DE EMERGENCIA 2023</a>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 bg-white"></td>
                  <td className="border border-slate-300 p-6 bg-white"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA 4: PREVENCIÓN VIOLENCIA (LEY KARIN) */}
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
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Formilario_de_denuncia1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Formulario denuncia</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Flujo_Activacion_APT1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Flujo activación APT</a></li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/F.A.F_formulario_Agresiones_Funcionarios1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Formulario F.A.F</a></li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Protocolo-de-prev-AS-AL-y-VT-Ley-21.6431.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Protocolo de prevención AS-AL-VT</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Manual_de_buenas_practicas_laborales1.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Manual de buenas practicas</a></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div><a href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/POLITICA_DE_CONCILIACIO%CC%81N_DE_LA_VIDA_LABORAL_Y_FAMILIAR_HSJM_20241.pdf" className="text-slate-800 underline underline-offset-4 hover:text-blue-700">Política de conciliación</a></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
        {/* TABLA 5: ACTIVIDADES REALIZADAS */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl text-slate-700 font-bold uppercase tracking-tight">Actividades Realizadas</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[800px]">
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div>
                        <a 
                          href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Capacitacion_uso_y_manejo_de_extintor_17_al_20_de_marzo_20251.pdf" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-800 underline underline-offset-4 hover:text-blue-700 transition-colors"
                        >
                          Capacitación uso y manejo de extintor
                        </a>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2 rounded-full border border-slate-500 shrink-0"></div>
                        <a 
                          href="http://10.5.131.63/intranet/wp-content/uploads/2025/08/Capacitacion_de_dosimetros1.pdf" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-800 underline underline-offset-4 hover:text-blue-700 transition-colors"
                        >
                          Capacitación de dosímetros
                        </a>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3"></td>
                  <td className="border border-slate-300 p-6 align-top bg-white w-1/3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrevencionRiesgos;