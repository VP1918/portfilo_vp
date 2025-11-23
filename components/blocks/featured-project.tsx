import Link from "next/link";

import { ArrowUpRight, Code, ExternalLink } from "lucide-react";

export const FeaturedProjectBlock = () => {
    return (
        <div className="flex flex-col h-full w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:-translate-y-1 transition-transform duration-300 group relative overflow-hidden">
            {/* Holographic Gradient Blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-colors duration-500" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition-colors duration-500" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <Code className="h-6 w-6" />
                </div>
                <div className="flex gap-3 text-neutral-400">
                    <Link href="https://github.com" target="_blank" className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-all">
                        <Code className="h-5 w-5" />
                    </Link>
                    <Link href="https://example.com" target="_blank" className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-all">
                        <ExternalLink className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors relative z-10">
                Real-time Weather Dashboard
            </h3>

            <div className="flex-1 relative z-10">
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    Architected a WebSocket-based dashboard handling <span className="text-white font-semibold">10k+ concurrent connections</span> with &lt;50ms latency. Optimized data parsing using custom binary protocol.
                </p>
            </div>

            <ul className="flex flex-wrap gap-2 mt-auto relative z-10">
                {["React", "Node.js", "Socket.io", "Redis"].map((tech) => (
                    <li key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-100/80">
                        {tech}
                    </li>
                ))}
            </ul>
        </div>
    );
};
