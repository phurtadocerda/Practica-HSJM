import React from 'react';
import { FileText, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const CodigoEtica = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook

  const documentos = [
    { titulo: "Código de Ética", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Codigo-de-Etica.pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Código de Ética"
        subtitle="Valores y Principios Institucionales"
        onBack={() => navigate('/inicio')}
        backLabel="VOLVER AL INICIO"
        badge="Biblioteca"
        badgeIcon={FolderOpen}
        badgeIconColor="text-amber-500"
      />

      {/* DOCUMENTO ÚNICO */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-amber-50/30 p-8 md:p-10 rounded-3xl border border-amber-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-amber-200 pb-4">
            <FileText size={16} className="text-amber-500" /> Documento Oficial
          </h3>
          
          <ul className="space-y-6 pl-2 md:pl-4">
            {documentos.map((doc, idx) => (
              <DocumentLink
                key={idx}
                titulo={doc.titulo}
                link={doc.link}
                accentText="group-hover:text-amber-700"
                accentDot="group-hover:bg-amber-500"
              />
            ))}
          </ul>
        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Compromiso con la Integridad - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

const DocumentLink = ({ titulo, link, accentText, accentDot }) => (
  <li className="list-none group">
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-start gap-3 w-fit"
    >
      <span className={`mt-2 w-2 h-2 rounded-full bg-slate-300 ${accentDot} transition-colors shrink-0`} />
      <span className={`text-slate-700 font-bold underline decoration-slate-200 ${accentText} underline-offset-4 transition-all text-xl md:text-2xl tracking-wide`}>
        {titulo}
      </span>
    </a>
  </li>
);

export default CodigoEtica;