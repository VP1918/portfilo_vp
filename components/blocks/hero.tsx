import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroBlock = () => {
    return (
        <div className="flex flex-col justify-center h-full w-full p-8 md:p-12 bg-transparent">
            <div className="flex flex-col gap-6 relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                    <span className="text-xs font-medium text-cyan-200 uppercase tracking-widest">Available for hire</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                    Crafting <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Digital Reality</span>
                </h1>

                <p className="text-neutral-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
                    I bridge the gap between <span className="text-white font-medium">complex engineering</span> and <span className="text-white font-medium">intuitive design</span> to build systems that scale.
                </p>
            </div>

            <div className="flex gap-4 mt-10">
                <Link href="/projects">
                    <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-neutral-200 font-bold text-base transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        View Work
                    </Button>
                </Link>
                <Link href="/about">
                    <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 font-medium text-base backdrop-blur-sm transition-all hover:scale-105">
                        About Me
                    </Button>
                </Link>
            </div>
        </div>
    );
};
