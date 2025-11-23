export const StatusBlock = () => {
    return (
        <div className="flex flex-col items-start justify-center h-full w-full gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" />

            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                </span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                    Online
                </span>
            </div>
            <p className="text-lg md:text-xl font-medium text-white leading-snug relative z-10">
                Building the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-bold">AI Infrastructure</span>.
            </p>
        </div>
    );
};
