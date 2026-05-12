import React from "react";
import { VideoOff } from "lucide-react";
import { useState } from "react";

const SafeVideoPlayer = ({ url, titulo }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <div className="space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-md border-2 border-white relative flex items-center justify-center">

                {hasError ? (
                    <div className="flex flex-col items-center p-6 text-center animate-in fade-in duration-500">
                        <div className="bg-white/10 p-4 rounded-full mb-3">
                            <VideoOff className="text-slate-400" size={40} />
                        </div>
                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">
                            Video en mantenimiento
                        </p>
                        <p className="text-slate-500 text-[10px] mt-1 italic">
                            El archivo está siendo actualizado por TI
                        </p>
                    </div>
                ) : (
                    <video
                        src={url}
                        controls
                        className="w-full h-full object-cover"
                        onError={() => setHasError(true)}
                    >
                        Tu navegador no soporta el video.
                    </video>
                )}
            </div>
            <p className="font-bold text-slate-700 text-center uppercase text-sm">
                {titulo}
            </p>
        </div>
    );
};

export default SafeVideoPlayer;