import React, { useState, useEffect } from 'react';
import { X, Gift, Cake, PartyPopper, CalendarDays } from 'lucide-react';
import api from '../api/axios';

const ModalCumpleanos = () => {
  // 1. Revisa si el usuario ya cerró los globos hoy
  const [isOpen, setIsOpen] = useState(() => {
    const yaSeMostro = localStorage.getItem('cumpleanosMostrado');
    return yaSeMostro !== 'true'; 
  });

  // 2. AHORA ES UN ESTADO: Aquí se guardará la lista real que mande la Base de Datos
  const [cumpleanerosHoy, setCumpleanerosHoy] = useState([]);

  // 3. LA MAGIA: Esto va a buscar los datos a tu servidor (Node.js) apenas carga la página
  useEffect(() => {
    const buscarCumpleanos = async () => {
      try {
        const respuesta = await api.get('/cumpleanos');
        console.log("Respuesta del servidor de cumpleaños:", respuesta.data);
        setCumpleanerosHoy(respuesta.data);
      } catch (error) {
        console.error("No se pudo conectar con la base de datos para los cumpleaños:", error);
      }
    };
    
    buscarCumpleanos();
  }, []); // Los corchetes vacíos aseguran que solo busque 1 vez al iniciar sesión

  const cerrarModal = () => {
    setIsOpen(false);
    localStorage.setItem('cumpleanosMostrado', 'true');
  };

  const obtenerFechaActual = () => {
    return new Intl.DateTimeFormat('es-CL', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());
  };

  // 4. Si la base de datos responde que la lista está vacía (nadie cumple hoy), no muestra nada
  if (cumpleanerosHoy.length === 0) return null;
  return (
    <>
      {/* BOTÓN FLOTANTE (Adaptado para móvil) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9998] bg-[#ffb81c] hover:bg-[#003876] text-[#003876] hover:text-white p-3 md:p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group animate-bounce-slow"
        >
          <Cake className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white">
            {cumpleanerosHoy.length}
          </span>
        </button>
      )}

      {/* MODAL PRINCIPAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-500 font-sans overflow-hidden">
          <style>
              {`
                @keyframes floatUp {
                  0% { transform: translateY(0) rotate(-10deg); opacity: 1; }
                  100% { transform: translateY(-120vh) rotate(10deg); opacity: 0; }
                }
                .party-item { position: absolute; bottom: -120px; animation: floatUp linear infinite; pointer-events: none; }
                
                /* Tamaños para celular */
                .item-lg { font-size: 4rem; }
                .item-md { font-size: 2.5rem; }
                .item-sm { font-size: 1.5rem; }
                
                /* Tamaños para computador */
                @media (min-width: 768px) {
                  .item-lg { font-size: 8rem; }
                  .item-md { font-size: 5rem; }
                  .item-sm { font-size: 3rem; }
                }
              `}
          </style>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* CAPA 1: Los más grandes y rápidos */}
            <div className="party-item item-lg left-[5%]" style={{ animationDuration: '7s', animationDelay: '-1s' }}>🎈</div>
            <div className="party-item item-lg left-[25%]" style={{ animationDuration: '9s', animationDelay: '-4s' }}>🎉</div>
            <div className="party-item item-lg left-[65%]" style={{ animationDuration: '8s', animationDelay: '-2s' }}>🎈</div>
            <div className="party-item item-lg left-[85%]" style={{ animationDuration: '10s', animationDelay: '-5s' }}>🎁</div>

            {/* CAPA 2: Medianos, velocidad normal */}
            <div className="party-item item-md left-[15%]" style={{ animationDuration: '11s', animationDelay: '-3s' }}>🍰</div>
            <div className="party-item item-md left-[40%]" style={{ animationDuration: '9.5s', animationDelay: '-6s' }}>🥳</div>
            <div className="party-item item-md left-[55%]" style={{ animationDuration: '10.5s', animationDelay: '-1.5s' }}>🎊</div>
            <div className="party-item item-md left-[75%]" style={{ animationDuration: '12s', animationDelay: '-7s' }}>🎈</div>
            <div className="party-item item-md left-[92%]" style={{ animationDuration: '9s', animationDelay: '-2.5s' }}>🍰</div>

            {/* CAPA 3: Pequeños y lentos (dan profundidad) */}
            <div className="party-item item-sm left-[10%]" style={{ animationDuration: '14s', animationDelay: '-0.5s' }}>✨</div>
            <div className="party-item item-sm left-[35%]" style={{ animationDuration: '13s', animationDelay: '-8s' }}>🎈</div>
            <div className="party-item item-sm left-[48%]" style={{ animationDuration: '15s', animationDelay: '-4.5s' }}>🎁</div>
            <div className="party-item item-sm left-[80%]" style={{ animationDuration: '12.5s', animationDelay: '-9s' }}>✨</div>
            <div className="party-item item-sm left-[95%]" style={{ animationDuration: '16s', animationDelay: '-3.5s' }}>🎉</div>
          </div>

          {/* CONTENEDOR DE LA TARJETA CON ALTURA MÁXIMA PARA QUE NO SE CORTE EN CELULARES */}
          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] w-full max-w-xl shadow-2xl relative z-10 border-4 border-[#ffb81c] overflow-hidden animate-in zoom-in-95 duration-500 text-center flex flex-col max-h-[90vh]">
            
            <button onClick={cerrarModal} className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/20 hover:bg-red-500 text-white p-1.5 md:p-2 rounded-full transition-all z-20 border-2 border-white/50">
              <X size={20} strokeWidth={3} />
            </button>

            {/* CABECERA */}
            <div className="bg-gradient-to-br from-[#00a19a] to-[#003876] p-6 md:p-10 relative shrink-0">
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 mx-auto text-[#ffb81c] mb-2 md:mb-4" />
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg leading-tight">
                ¡Feliz Cumpleaños!
              </h2>
              <div className="mt-3 md:mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20">
                <CalendarDays className="text-[#ffb81c] w-3 h-3 md:w-4 md:h-4" />
                <span className="text-white text-[9px] md:text-xs font-black uppercase tracking-widest">{obtenerFechaActual()}</span>
              </div>
            </div>

            {/* LISTA DE CUMPLEAÑEROS (Con Scroll si son muchos) */}
            <div className="p-4 md:p-10 bg-slate-50 overflow-y-auto">
              <div className="space-y-3 md:space-y-5">
                {cumpleanerosHoy.map((persona) => (
                  <div key={persona.id} className="bg-white border-2 border-slate-100 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 text-left">
                    <div className="bg-slate-100 p-3 md:p-5 rounded-xl md:rounded-2xl text-[#00a19a] shrink-0">
                      <Gift className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-black text-[#003876] text-lg md:text-2xl uppercase leading-tight truncate">
                        {persona.nombre}
                      </span>
                      <span className="text-slate-500 font-bold text-[10px] md:text-base mt-1 uppercase italic truncate">
                        {persona.cargo} <span className="text-[#00a19a] hidden xs:inline">•</span> <span className="block xs:inline text-[#00a19a]">{persona.unidad}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCumpleanos;