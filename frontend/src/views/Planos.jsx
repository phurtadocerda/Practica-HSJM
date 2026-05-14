import React, { useState, useEffect } from 'react';
import { Map, Download, FileText, MapPin, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';

const Planos = () => {

  const [listaPlanos, setListaPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planoActivo, setPlanoActivo] = useState(null);
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await api.get('/documentos/planos');
        const data = response.data;

        if (data.success) {
          setListaPlanos(data.documentos || []);
        } else {
          toast.error(data.message || "Error al obtener archivos");
        }

      } catch (err) {
        console.error("Error de conexión:", err);
        toast.error("No se pudo conectar con el servidor");

      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    if (listaPlanos.length > 0 && !planoActivo) {
      setPlanoActivo(listaPlanos[0]);
    }
  }, [listaPlanos, planoActivo]);

  const ordenCategorias = [
    "Índice",
    "Nivel -1",
    "Nivel 1",
    "Nivel 2",
    "Nivel 3",
    "Nivel 4",
    "Nivel 5",
    "Nivel 6",
    "Nivel 7"
  ];

  return (
    <section className="bg-slate-50 rounded-[1.5rem] p-3 md:p-8 shadow-2xl border border-slate-100 min-h-[85vh] w-full font-sans animate-in fade-in zoom-in duration-500 flex flex-col mb-20 md:mb-0">

      <PageHeader
        title={<>Planos <span className="text-cyan-600">Hospital</span></>}
        badge="Oficiales PDF"
        badgeIcon={FileText}
        icon={Map}
        iconBg="bg-[#003876]"
        showBackButton={true}
        backPath="/inicio"
        backLabel="VOLVER"
      />

      <div className="flex flex-col lg:flex-row gap-4 flex-grow lg:h-[650px]">


        <div className="w-full lg:w-1/3 flex flex-col gap-2 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-sm max-h-[400px] lg:max-h-full">

          <div className="mb-3 border-b border-slate-100 pb-3">

            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1 mb-1">
              <Filter size={12} /> Filtrar por Nivel
            </label>

            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#003876] outline-none focus:border-cyan-500 cursor-pointer appearance-none"
            >
              <option value="Todos">Mostrar Todos</option>

              {ordenCategorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>


          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400 font-bold">
              Cargando planos...
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">

              {ordenCategorias.map(categoria => {

                if (filtroNivel !== 'Todos' && filtroNivel !== categoria) return null;

                const planosDeEsteNivel = listaPlanos.filter(
                  p => p.subcategoria === categoria
                );

                if (planosDeEsteNivel.length === 0) return null;

                return (
                  <div key={categoria} className="flex flex-col gap-2 relative">

                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-1.5 border-b-2 border-cyan-100 mb-1">
                      <h4 className="text-[#003876] font-black uppercase text-[10px] md:text-xs tracking-widest">
                        {categoria}
                      </h4>
                    </div>

                    {planosDeEsteNivel.map((plano) => (

                      <div
                        key={plano.id}
                        className={`flex items-center justify-between p-2 md:p-3 rounded-xl border transition-all cursor-pointer ${
                          planoActivo?.id === plano.id
                            ? 'bg-[#003876] border-[#003876] text-white shadow-md ml-1 border-l-4 border-l-[#ffb81c]'
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-cyan-500 hover:bg-white'
                        }`}
                        onClick={() => setPlanoActivo(plano)}
                      >

                        <div className="flex items-center gap-2 flex-grow overflow-hidden">

                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            planoActivo?.id === plano.id
                              ? 'bg-white/20'
                              : 'bg-white shadow-sm text-cyan-600'
                          }`}>
                            <MapPin size={14} />
                          </div>

                          <div className="flex flex-col min-w-0 pr-1">
                            <span
                              className="font-bold text-[11px] md:text-xs truncate"
                              title={plano.titulo}
                            >
                              {plano.titulo}
                            </span>
                          </div>

                        </div>

                        <a
                          href={`http://localhost:5000/uploads/${plano.url.replace('documentos/', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          onClick={(e) => e.stopPropagation()}
                          className={`p-1.5 rounded-lg transition-all shrink-0 ${
                            planoActivo?.id === plano.id
                              ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-inner'
                              : 'bg-white border text-slate-400 hover:text-[#003876]'
                          }`}
                          title="Descargar Plano"
                        >
                          <Download size={14} />
                        </a>

                      </div>
                    ))}
                  </div>
                );
              })}

            </div>
          )}
        </div>

        {/* VISOR PDF */}
        <div className="w-full lg:w-2/3 bg-slate-200 rounded-2xl border-2 md:border-4 border-white shadow-lg flex flex-col overflow-hidden relative h-[400px] lg:h-full mt-4 lg:mt-0">

          <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center z-10 shadow-sm">

            <div className="flex items-center gap-2 overflow-hidden">
              <FileText size={16} className="text-cyan-600 shrink-0" />

              <span className="font-black text-[#003876] text-[10px] md:text-sm truncate uppercase italic">
                {planoActivo?.titulo}
              </span>
            </div>

          </div>

          <div className="flex-grow w-full bg-slate-300 relative">

            {planoActivo ? (
              <iframe
                src={`http://localhost:5000/uploads/${planoActivo.url.replace('documentos/', '')}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                className="absolute inset-0 w-full h-full border-0"
                title="Visor PDF"
              >
                <p className="p-4 text-center text-xs">
                  Navegador no soporta PDF directo.
                </p>
              </iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 font-bold">
                Selecciona un plano
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Planos;