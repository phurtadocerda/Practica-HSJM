import React from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook
import PageHeader from '../components/PageHeader';

const Iaas = () => { // 2. Quitamos el prop onNavigate antiguo
  const navigate = useNavigate(); // 3. Inicializamos el hook para navegar

  // === CONFIGURACIÓN DEL VIDEO ===
  const urlVideoIaas = "http://10.5.131.63/intranet/wp-content/uploads/2025/02/iaas-final_1CPdjwZy.mp4?_=1";

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[700px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader
          title= "IAAS"
          subtitle="Infecciones Asociadas a la Atención de Salud"
          onBack={() => navigate('/accesos')}
          backLabel="VOLVER A ACCESOS"
          icon={ShieldCheck}
          iconBg="bg-[#00a19a]"
      />

      {/* CONTENEDOR DEL VIDEO CENTRAL */}
      <div className="max-w-6xl mx-auto">
        <div className="aspect-video bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
          
          {/* Reproductor de Video Nativo */}
          <video 
            src={urlVideoIaas} 
            controls 
            className="w-full h-full object-cover"
            poster="https://via.placeholder.com/1920x1080/003876/FFFFFF?text=Video+IAAS"
          >
            Tu navegador no soporta la reproducción de video.
          </video>

          {/* Superposición decorativa */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <ShieldCheck className="text-white" size={60} strokeWidth={1}/>
            </div>
          </div>
        </div>

        {/* Texto descriptivo */}
        <div className="mt-8 text-center bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-3xl mx-auto">
            <p className="text-slate-700 font-medium text-lg">
                Visualiza el video instructivo sobre los protocolos y medidas de prevención de Infecciones Asociadas a la Atención de Salud (IAAS) en nuestro establecimiento.
            </p>
        </div>
      </div>

    </section>
  );
};

export default Iaas;