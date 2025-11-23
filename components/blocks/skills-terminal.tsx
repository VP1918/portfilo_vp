"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, Wifi } from "lucide-react";

const COMMANDS = {
    help: "Available commands: help, ls, whoami, contact, clear",
    ls: "Skills:\n- Python (Proficient)\n- TypeScript (Proficient)\n- Next.js (Used in Production)\n- C++ (Familiar)\n- Rust (Learning)\n- CUDA (Learning)",
    whoami: "Engineering Student building scalable systems.",
    contact: "Email: student@example.com\nGitHub: github.com/example",
    clear: "CLEAR_TERMINAL",
};

export const SkillsTerminalBlock = () => {
    const [history, setHistory] = useState<string[]>([
        "Initializing system...",
        "Loading neural interface...",
        "Welcome, User.",
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        if (cmd === "clear") {
            setHistory([]);
        } else if (cmd in COMMANDS) {
            setHistory((prev) => [
                ...prev,
                `> ${input}`,
                COMMANDS[cmd as keyof typeof COMMANDS],
            ]);
        } else {
            setHistory((prev) => [
                ...prev,
                `> ${input}`,
                `Error: Command '${cmd}' not recognized.`,
            ]);
        }
        setInput("");
    };

    return (
        <div className="flex flex-col h-full w-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 font-mono text-sm overflow-hidden shadow-2xl relative group">
            {/* HUD Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2 text-cyan-400">
                    <Terminal className="h-4 w-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">System.sh</span>
                </div>
                <div className="flex gap-3">
                    <Cpu className="h-4 w-4 text-purple-400 animate-pulse" />
                    <Wifi className="h-4 w-4 text-green-400" />
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />

            <div className="flex-1 p-4 overflow-y-auto min-h-[200px] space-y-2 relative z-0">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap font-medium">
                        {line.startsWith(">") ? (
                            <span className="text-cyan-400">{line}</span>
                        ) : line.startsWith("Error") ? (
                            <span className="text-red-400">{line}</span>
                        ) : (
                            <span className="text-neutral-300">{line}</span>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleCommand} className="p-3 bg-white/5 border-t border-white/5 flex gap-2 relative z-20">
                <span className="text-cyan-400 animate-pulse">{">"}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20"
                    placeholder="Enter command..."
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
