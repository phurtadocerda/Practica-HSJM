import React, { useState, useEffect } from 'react';
import { FileX, FileText, Loader2 } from 'lucide-react';

const SafeFileLink = ({ url, titulo, groupHover = 'group-hover:bg-[#00a19a]', hoverBorder = 'hover:border-[#00a19a]' }) => {

  const [isVerifying, setIsVerifying] = useState(true);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    fetch(url, { method: 'HEAD' })
      .then(res => setExists(res.ok))
      .catch(() => setExists(false))
      .finally(() => setIsVerifying(false));
  }, [url]);

  if (isVerifying) {
    return (
      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
        <Loader2 className="animate-spin text-slate-400" size={18} />
        <span className="text-sm font-bold text-slate-400 uppercase">Verificando archivo...</span>
      </div>
    );
  }

  return exists ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={"flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 " + hoverBorder + " hover:shadow-md transition-all group"}
    >
      <div className={"w-2.5 h-2.5 rounded-full bg-slate-300 " + groupHover + " shrink-0 transition-colors"} />
      <span className="font-bold text-slate-700 underline underline-offset-4 group-hover:text-[#003876] transition-colors">
        {titulo}
      </span>
    </a>
  ) : (
    <div className="flex items-center gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100 cursor-not-allowed group">
      <div className="bg-white p-1.5 rounded-lg shadow-sm">
        <FileX className="text-red-400" size={18} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-slate-400 line-through text-sm leading-tight">{titulo}</span>
        <span className="text-[9px] text-red-500 font-black uppercase tracking-tighter">Documento no disponible</span>
      </div>
    </div>
  );
};

export default SafeFileLink;