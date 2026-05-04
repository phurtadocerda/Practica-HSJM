import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

// === IMPORTACIÓN DIRECTA DE IMÁGENES ===
import ley from '../assets/ley.png';
import ley2 from '../assets/ley2.png';
import violencia from '../assets/violencia.png';
import salud from '../assets/salud.png';

const CalidadDeVida = () => { 
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  
  const documentos = [
    { name: "Manual de buenas practicas laborales", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/01/Manual-de-buenas-practicas-laborales.pdf" },
    { name: "POLITICA DE CONCILIACIÓN DE LA VIDA LABORAL Y FAMILIAR HSJM 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/01/POLITICA-DE-CONCILIACION-DE-LA-VIDA-LABORAL-Y-FAMILIAR-HSJM-2024.pdf" },
    { name: "Protocolo Prevención acoso laboral y/o sexual y violencia.", link: "https://drive.google.com/file/d/1ZjVb_Vxd475t_3tVH6JN-8z2KzUXppHn/view?pli=1" },
    { name: "Decálogo de Buen Trato", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/10/DECALOGO.pdf" },
    { name: "Protocolo Autocuidado laboral", link: "https://drive.google.com/file/d/1PbOvigzWk03LzWCrGiRX4vBr6psYh-V9/view" },
    { name: "Formulario denuncias VALS (Ley Karín)", link: "https://docs.google.com/document/d/1W7XAZclcnYYblYVe1cEPU3xSl2_g-B-u/edit?pli=1" },
    { name: "Carta Compromiso Ley Karin (SSmocc)", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/CARTA-COMPROMISO-LEY-KARIN.pdf" },
    { name: "Formulario Agresiones Hospitales ", link: "https://docs.google.com/document/d/1PUG0UnYtSH6kXzXK8oOLGTEdrqtTxTBR/edit?rtpof=true&sd=true" },
    { name: "Protocolo Salud mental funcionarios/as", link: "https://drive.google.com/file/d/1Hl3vvyz9NRdvHPOEV4cZSgCVG5jUUlQf/view" },
  ];

  const carruselFotos = [salud, ley, ley2, violencia]; 

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Calidad de Vida"
        subtitle="Hospital San José de Melipilla"
        onBack={() => navigate('/accesos')}
        backLabel="VOLVER A ACCESOS"
      />
     
        {/* 3. CARRUSEL "PAUSA SALUDABLE" */}
        <div className="max-w-2xl mx-auto mb-10 relative group">
          <div className="relative h-[250px] md:h-[350px] overflow-hidden rounded-xl border border-slate-200 shadow-md bg-slate-100">
            
            {carruselFotos[currentImg] ? (
              <img 
                src={carruselFotos[currentImg]} 
                alt="Pausa Saludable" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs text-center p-4">
                Verifica que las imágenes existan en la carpeta assets
              </div>
            )}

            <button 
              onClick={() => setCurrentImg(prev => prev === 0 ? carruselFotos.length -1 : prev - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            >
              <ChevronLeft size={28} className="text-[#003876] stroke-[3]" />
            </button>
            <button 
              onClick={() => setCurrentImg(prev => prev === carruselFotos.length -1 ? 0 : prev + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            >
              <ChevronRight size={28} className="text-[#003876] stroke-[3]" />
            </button>
          </div>
        </div>

        {/* 4. LISTADO DE DOCUMENTOS */}
        <div className="max-w-5xl mx-auto pt-6 pl-4">
          <ul className="space-y-4">
            {documentos.map((doc, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-black text-2xl leading-none mt-1 shrink-0">•</span>
                <a 
                  href={doc.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#003876] font-bold text-sm md:text-base underline underline-offset-4 hover:text-blue-500 uppercase tracking-tight leading-tight"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
    </section>
  );
};

export default CalidadDeVida;