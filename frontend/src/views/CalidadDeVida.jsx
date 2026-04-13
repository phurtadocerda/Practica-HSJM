import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const CalidadDeVida = ({ onNavigate, fotos }) => {
  // Estado para el carrusel interno de "Pausa Saludable"
  const [currentImg, setCurrentImg] = useState(0);
  
  // Lista de documentos exacta a tu captura
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

  // --- CORRECCIÓN AQUÍ ---
  // Imágenes para el carrusel de Pausa Saludable (usando tus NUEVAS fotos)
  const carruselFotos = [fotos.salud, fotos.ley, fotos.ley2, fotos.violencia]; 
  // He puesto 'salud' primero, pero puedes cambiar el orden si quieres.

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER SIMPLE CON VOLVER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm"
          >
            <ChevronLeft size={18} /> VOLVER A ACCESOS
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Calidad de Vida</h2>
          <p className="text-[#00a19a] font-bold uppercase tracking-widest mt-2">Hospital San José de Melipilla</p>
        </div>
      </div>

      {/* 1. CABECERA DE COLOR (Degradado Verde Azulado a Turquesa - Fiel a tu foto) */}
      <div className="bg-gradient-to-r from-[#003e44] via-[#003e44] to-[#01a09d] rounded-t-xl p-6 flex items-center justify-between border-b-4 border-[#01a09d]">
        {/* Logo a la izquierda en cuadro blanco */}
        <div className="bg-white p-2 rounded-lg shadow-md shrink-0">
          <img src={fotos.logoHospital} alt="Logo Hospital" className="h-16 w-auto" />
        </div>
        
        {/* Título itálico a la derecha */}
        <h3 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter uppercase mr-10 leading-none">
          calidad de vida
        </h3>
      </div>

      {/* 2. CONTENEDOR PRINCIPAL CON BORDE AZUL MARINO (Fiel a tu foto) */}
      <div className="border-2 border-[#003876] p-4 md:p-10 bg-white shadow-inner rounded-b-xl">
        
     {/* 3. CARRUSEL "PAUSA SALUDABLE" (AJUSTADO A TAMAÑO MÁS PEQUEÑO) */}
<div className="max-w-2xl mx-auto mb-10 relative group">
  <div className="relative h-[250px] md:h-[350px] overflow-hidden rounded-xl border border-slate-200 shadow-md bg-slate-100">
    
    {/* Imagen del carrusel */}
    {carruselFotos[currentImg] ? (
      <img 
        src={carruselFotos[currentImg]} 
        alt="Pausa Saludable" 
        className="w-full h-full object-cover transition-all duration-700"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs">Cargando...</div>
    )}

    {/* Controles del Carrusel (Flechas un poco más pequeñas) */}
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
  
  {/* Título del Carrusel */}
  <p className="text-center mt-3 font-bold text-slate-700 italic border-b border-slate-200 pb-2 uppercase text-[10px] tracking-[0.2em]">
    Pausa Saludable
  </p>
</div>

        {/* 4. LISTADO DE DOCUMENTOS (Puntos Negros y Texto subrayado en mayúsculas) */}
        <div className="max-w-5xl mx-auto pt-6 pl-4">
          <ul className="space-y-4">
            {documentos.map((doc, index) => (
              <li key={index} className="flex items-start gap-4">
                {/* PUNTO NEGRO */}
                <span className="text-black text-2xl leading-none mt-1 shrink-0">•</span>
                
                {/* ENLACE AZUL SUBRAYADO */}
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
      </div>

    </section>
  );
};

export default CalidadDeVida;