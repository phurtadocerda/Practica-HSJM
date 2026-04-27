import React from 'react';
import { ChevronLeft, AlertCircle, Mail, FileText, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const EventoAdverso = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook

  const destinatarios = [
    "eventocentinela@minsal.cl",
    "daniella.greibe@redsalud.gov.cl",
    "pablo.jimenez.q@redsalud.gob.cl",
    "soledad.delcampo@redsalud.gov.cl",
    "oscar.vargasd@redsalud.gov.cl",
    "calidad.hsjm@redsalud.gov.cl",
    "Ivanka.kepec@redsalud.gov.cl",
    "mariaelena.encina@redsalud.gov.cl"
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button 
            onClick={() => navigate('/inicio')} // 4. CORRECCIÓN: Usamos navigate
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs shadow-sm"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg">
              <AlertCircle size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Evento <span className="text-red-600">Adverso</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">Notificación y Vigilancia de Eventos Centinela</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-red-600" /> Seguridad del Paciente
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* DESCARGA DE FORMULARIO */}
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-sm">
          <h3 className="text-sm font-black text-red-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <FileText size={20} /> Formulario de Descarga
          </h3>
          <a href="http://10.5.131.63/intranet/wp-content/uploads/2024/07/NOTIFICACION-EVENTO-ADVERSO-final.docx" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-black text-red-600 underline decoration-red-200 hover:text-red-700 hover:decoration-red-600 transition-all">
            NOTIFICACIÓN EVENTO ADVERSO
          </a>
        </div>

        {/* DESTINATARIOS */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-[#003876] uppercase tracking-tight flex items-center gap-2">
            <Mail size={20} className="text-red-600" /> Destinatarios de Notificaciones (Eventos Centinela)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinatarios.map((correo, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3 hover:border-red-300 hover:shadow-md transition-all group">
                <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                  <Mail size={16} className="text-slate-400 group-hover:text-red-600" />
                </div>
                <a href={`mailto:${correo}`} className="text-slate-600 font-bold text-sm hover:text-red-600 break-all">
                  {correo}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Unidad de Calidad y Seguridad del Paciente - HSJM</p>
      </div>

    </section>
  );
};

export default EventoAdverso;