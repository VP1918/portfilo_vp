import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export const SocialProofBlock = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex gap-6 relative z-10">
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 hover:scale-110 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 group" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="h-8 w-8 text-white group-hover:text-cyan-400 transition-colors" />
                    </a>
                </Button>
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 hover:scale-110 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all duration-300 group" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-8 w-8 text-white group-hover:text-blue-400 transition-colors" />
                    </a>
                </Button>
            </div>
            <div className="text-center space-y-1 relative z-10">
                <p className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">1,240+</p>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Commits this year</p>
            </div>
        </div>
    );
};
