import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const DocumentosPDF = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title={<> Documentos <span className="text-slate-500">PDF</span></>}
        onBack={() => navigate('/inicio')}
        backLabel="VOLVER AL INICIO"
        icon={FileText}
        iconBg="bg-slate-700"
      />

      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-500 italic font-bold text-lg mb-8">Descargar:</h3>
        <div className="flex items-center gap-3 group">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-700 transition-colors"></span>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2021/04/FICHA-PROGRAMA-MALNUTRICION.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xl md:text-2xl font-bold text-black hover:text-slate-700 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            FICHA PROGRAMA MALNUTRICION
          </a>
        </div>
      </div>
    </section>
  );
};

export default DocumentosPDF;