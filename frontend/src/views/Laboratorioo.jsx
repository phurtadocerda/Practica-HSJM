import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import PageHeader from '../components/PageHeader';

const LaboratorioInstructivo = () => { 
  const navigate = useNavigate();

  // === LISTA DE DOCUMENTOS EXACTA DE TU IMAGEN ===
  const documentos = [
    { name: "instructivos a pacientes PDF", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/instructivos-a-pacientes-PDF.docx" }, 
    { name: "SARAMPION-RUBEOLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/SARAMPION-RUBEOLA.pdf" }, 
    { name: "PCR CHAGAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/PCR-CHAGAS.pdf" }, 
    { name: "HTLV 1-2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/HTLV-1-2.pdf" }, 
    { name: "CITOMEGALOVIRUS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CITOMEGALOVIRUS.pdf" }, 
    { name: "BARTONELLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/BARTONELLA.pdf" }, 
    { name: "CARTERA DE EXAMENES 2021 HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CARTERA-DE-EXAMENES-2021-HSJM.pdf" }, 
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      < PageHeader
        title={"laboratorio – instructivos exámenes y formularios ISP"}
        onBack={() => navigate('/accesos')}
        backLabel="VOLVER A ACCESOS"
      />
      
      {/* CONTENEDOR MÁS ANCHO PARA EVITAR ESPACIO BLANCO */}
      <div className="w-full max-w-7xl mx-auto space-y-10 pt-4 flex flex-col items-start">
        
        {/* LISTA DE ENLACES */}
        <div className="w-full pl-2 md:pl-6">
          <ul className="space-y-6">
            {documentos.map((doc, index) => (
              <li key={index} className="flex items-center gap-4 group">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-bold text-lg md:text-2xl underline underline-offset-4 hover:text-blue-700 transition-colors uppercase tracking-tight"
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

export default LaboratorioInstructivo;