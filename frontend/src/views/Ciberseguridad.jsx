import React, { useState } from 'react';
import { ChevronLeft, PlayCircle } from 'lucide-react';

const Ciberseguridad = ({ onNavigate, fotos }) => {
  // Estado para controlar en qué sub-página estamos ('menu', 'resolucion', o 'consejos')
  const [subPage, setSubPage] = useState('menu');

  // Lista de 5 videos de YouTube (Se muestran solo en el menú principal)
  const videos = [
    { name: "Ciberseguridad para Todos", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Conciencia_Digital_1.mp4?_=1" },
    { name: "Tu privacidad en internet es clave", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/CiberTip1.mp4?_" },
    { name: "No comparta tus datos personales o claves en la web", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/CiberTip3_Datos_personales.mp4?_=3" },
    { name: "No utilicez wifi abiertas para transacciones personales", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/CiberTip4_Navegacion_segura.mp4?_=4" },
    { name: "Crea contraseña seguras", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/CiberTip5_Contrasenas_seguras.mp4?_=5" },
  ];

  // Componente reutilizable para los enlaces con viñeta de círculo vacío (ACTUALIZADO PARA RECIBIR LINKS)
  const LinkItem = ({ text, link }) => (
    <li className="flex items-center gap-3 group">
      <div className="w-1.5 h-1.5 rounded-full border border-slate-800 shrink-0"></div>
      <a 
        href={link} 
        target="_blank" 
        rel="noreferrer" 
        className="text-slate-800 font-bold text-lg underline underline-offset-2 hover:text-blue-700 transition-colors"
      >
        {text}
      </a>
    </li>
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER DINÁMICO CON BOTÓN VOLVER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            // Si estamos en el menú, vuelve a accesos. Si estamos en una carpeta, vuelve al menú.
            onClick={() => subPage === 'menu' ? onNavigate('accesos') : setSubPage('menu')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm"
          >
            <ChevronLeft size={18} /> {subPage === 'menu' ? 'VOLVER A ACCESOS' : 'VOLVER AL MENÚ'}
          </button>
          
          {/* El título cambia según la página */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
            {subPage === 'menu' && 'Seguridad de la Información y Ciberseguridad'}
            {subPage === 'resolucion' && 'Resolución'}
            {subPage === 'consejos' && 'Consejos Seguridad'}
          </h2>
        </div>
      </div>

      {/* ================= VISTA 1: MENÚ PRINCIPAL ================= */}
      {subPage === 'menu' && (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-600 font-bold uppercase text-sm tracking-widest leading-none">Documentación:</p>

          {/* ICONOS DE ACCESO (Carpeta y Laptop) */}
          <div className="flex flex-wrap gap-12 justify-start items-end pt-4">
            <div 
              onClick={() => setSubPage('resolucion')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <img src={fotos.resolucion} alt="Resolución" className="w-48 h-auto transition-transform group-hover:scale-105 active:scale-95" />
              <span className="mt-2 font-black italic text-xl text-slate-800 leading-none">-Resolución</span>
            </div>
            
            <div 
              onClick={() => setSubPage('consejos')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <img src={fotos.Soporte} alt="Consejos Seguridad" className="w-56 h-auto transition-transform group-hover:scale-105 active:scale-95" />
              <span className="mt-2 font-black italic text-xl text-slate-800 leading-none">-Consejos Seguridad</span>
            </div>
          </div>

          {/* LISTA DE ENLACES PRINCIPALES */}
          <div className="pt-10">
            <p className="text-slate-800 font-black mb-6 text-lg tracking-tight leading-none">Ver:</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full border border-blue-600 shrink-0"></div>
                <a href="http://10.5.131.63/intranet/wp-content/uploads/2022/10/POLITICAS-DE-SEGURIDAD-DE-LA-INFORMACION-HOSPITAL-SAN-JOSE-DE-MELIPILLA.pdf" target="_blank" rel="noreferrer" className="text-blue-700 font-black text-lg underline hover:text-blue-900 uppercase tracking-tight leading-tight">
                  POLITICAS DE SEGURIDAD DE LA INFORMACION HOSPITAL SAN JOSÉ DE MELIPILLA
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full border border-blue-600 shrink-0"></div>
                <a href="http://10.5.131.63/intranet/wp-content/uploads/2024/08/Guia-Buenas-Practicas-de-Privacidad-y-seguridad-de-Datos-en-Salud.pdf" target="_blank" rel="noreferrer" className="text-blue-700 font-black text-lg underline hover:text-blue-900 uppercase tracking-tight leading-tight">
                  Guía- Buenas Practicas de Privacidad y seguridad de Datos en Salud
                </a>
              </li>
            </ul>
          </div>

          {/* CÁPSULAS INFORMATIVAS (VIDEOS) */}
          <div className="pt-16 border-t border-slate-100">
            <p className="text-slate-800 font-black mb-8 text-xl tracking-tight leading-none">Cápsulas Informativas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div key={index} className={`bg-slate-50 p-6 rounded-2xl shadow-lg border border-transparent hover:border-blue-200 transition-all ${index === 3 || index === 4 ? 'md:col-span-1 lg:col-span-1 md:justify-self-center lg:justify-self-center lg:first-of-type:col-start-2' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="text-blue-600" size={20} strokeWidth={2.5}/>
                    <h4 className="font-bold text-sm text-slate-700 uppercase tracking-widest leading-none">{video.name}</h4>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-md border border-slate-200">
                    <iframe src={video.url} title={video.name} frameBorder="0" allowFullScreen className="w-full h-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= VISTA 2: RESOLUCIÓN ================= */}
      {subPage === 'resolucion' && (
        <div className="max-w-5xl mx-auto pt-8 animate-in fade-in slide-in-from-right-8 duration-500">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 rounded-full border border-slate-800 shrink-0"></div>
              <a href="http://10.5.131.63/intranet/wp-content/uploads/2024/08/Resolucion-005562-Encargado-de-Seguridad-de-la-Informacion-y-Ciberseguridad.pdf" target="_blank" rel="noreferrer" className="text-slate-800 font-bold text-lg underline hover:text-blue-900 uppercase tracking-tight leading-tight">
                Resolucion – Encargado de Seguridad de la Información y Ciberseguridad
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* ================= VISTA 3: CONSEJOS SEGURIDAD ================= */}
      {subPage === 'consejos' && (
        <div className="max-w-5xl mx-auto pt-8 animate-in fade-in slide-in-from-right-8 duration-500">
          
          {/* Grupo 1 */}
          <ul className="space-y-4 mb-8">
            <LinkItem 
              text="Consejos para evitar delitos cibernéticos" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2021/07/Consejos-para-evitar-delitos-ciberneticos.pdf" 
            />
            <LinkItem 
              text="Consejos de navegación segura" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2021/07/Consejos-de-navegacion-segura.pdf" 
            />
            <LinkItem 
              text="Consejos como evitar robo de cuentas whatsapp" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2021/07/Consejos-como-evitar-robo-de-cuentas-whatsapp-.pdf" 
            />
          </ul>

          <hr className="border-slate-300 mb-8" />

          {/* Grupo 2 */}
          <ul className="space-y-4 mb-12">
            <LinkItem 
              text="MANUAL DE BUENAS PRACTICAS POLÍTICAS DE SEGURIDAD" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2020/03/Manual-politicas-de-seguridad.pdf" 
            />
            <LinkItem 
              text="POLÍTICAS SEGURIDAD SSMOCC RES. EXENTA N°0322" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2020/03/Politicas-SSMOC-.pdf" 
            />
            <LinkItem 
              text="INSTRUCTIVO ACCESO Y CONFIGURACIÓN CORREO INSTITUCIONAL" 
              link="http://10.5.131.63/intranet/wp-content/uploads/2020/04/INSTRUCTIVO-CORREO-WEBMAIL.pdf" 
            />
          </ul>

          {/* Enlace suelto abajo */}
          <div className="pt-8">
            <a 
              href="http://10.5.131.63/intranet/wp-content/uploads/2022/10/Guia-proteccio%CC%81n-datos-personales-para-instituciones-pu%CC%81blicas-Agosto2022.-1.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-800 font-medium text-lg underline underline-offset-2 hover:text-blue-700 transition-colors"
            >
              Guia-protección-datos-personales-para-instituciones-públicas-Agosto2022.
            </a>
          </div>
          
        </div>
      )}

    </section>
  );
};

export default Ciberseguridad;