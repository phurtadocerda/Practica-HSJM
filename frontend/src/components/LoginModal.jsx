import React from 'react';
import { X, Lock, UserCircle, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100">
        
        {/* Cabecera del Modal */}
        <div className="bg-[#003876] p-8 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#ffb81c]" size={28} />
            <h2 className="text-2xl font-black">Acceso Portal HSJM</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-10">
          <div className="text-center mb-10">
            <p className="text-slate-500 font-medium italic">"Juntos construimos la salud de nuestra comunidad"</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#003876] ml-1">RUT Paciente / Funcionario</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-4 text-slate-400" size={20} />
                <input type="text" placeholder="12.345.678-9" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a19a] focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#003876] ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a19a] focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <button type="submit" className="w-full mt-10 bg-[#ffb81c] hover:bg-yellow-500 text-[#003876] font-black py-5 rounded-xl transition-all shadow-lg active:scale-95 text-lg">
              INGRESAR AL PORTAL
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm border-t border-slate-100 pt-6">
            <a href="#" className="text-[#003876] hover:text-[#00a19a] hover:underline">¿Olvidaste tu contraseña?</a>
            <p className="mt-4 text-slate-400 italic text-xs">Soporte Técnico: Anexo 5555 | Unidad de Informática</p>
          </div>
        </div>
      </div>
    </div>
  );
}