"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useHaptic } from "@/hooks/useHaptic";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { triggerHaptic } = useHaptic();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        triggerHaptic();
        setLoading(true);
        setError("");
        setSuccess(false);

        const projectId = "portfolioweb-14cd5";
        const safeName = formData.name.replace(/\s+/g, '_');
        const customId = `${safeName}_${Date.now()}`;
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contacts?documentId=${customId}`;
        console.log("Sending via REST API to:", url);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: {
                        name: { stringValue: formData.name },
                        email: { stringValue: formData.email },
                        message: { stringValue: formData.message },
                        timestamp: { timestampValue: new Date().toISOString() },
                    },
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Full Error Body:", errorBody);
                throw new Error(`Status ${response.status}: ${errorBody}`);
            }

            const data = await response.json();
            console.log("Success:", data);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err: any) {
            console.error("Error sending message:", err);
            setError("Error: " + (err.message || "Something went wrong"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-neutral-900/60 via-slate-900/50 to-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-8 overflow-hidden group">
            {/* Animated glass background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            {/* Floating glass orbs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Send className="text-cyan-400 w-5 h-5" /> Send a Message
                </h3>

                {error ? (
                    <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg mb-6">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-slate-800/30 backdrop-blur-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:bg-slate-800/50 hover:bg-slate-800/40 transition-all placeholder:text-slate-500 shadow-inner"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-slate-800/30 backdrop-blur-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:bg-slate-800/50 hover:bg-slate-800/40 transition-all placeholder:text-slate-500 shadow-inner"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-slate-800/30 backdrop-blur-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:bg-slate-800/50 hover:bg-slate-800/40 transition-all resize-none placeholder:text-slate-500 shadow-inner"
                            placeholder="How can I help you?"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500/80 to-blue-600/80 backdrop-blur-xl text-white rounded-lg font-bold text-lg hover:from-cyan-400/90 hover:to-blue-500/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_8px_32px_0_rgba(6,182,212,0.37)] hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.5)] border border-white/20 hover:border-white/30 relative overflow-hidden group"
                    >
                        {/* Glass overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Send Message
                            </>
                        )}
                    </button>

                    {success ? (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-center font-medium flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <CheckCircle2 className="w-5 h-5" />
                            ✅ Thank you! Your message has been sent.
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
}
