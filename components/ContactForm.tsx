"use client";

import { useState, useRef } from "react";
import { Send, Loader2, CheckCircle2, User, Mail, MessageSquare, Shield } from "lucide-react";
import { useHaptic } from "@/hooks/useHaptic";

// Input sanitization helper
const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
        .trim();
};

// Email validation
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

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

    // Rate limiting - track last submission time
    const lastSubmitTime = useRef<number>(0);
    const COOLDOWN_PERIOD = 60000; // 60 seconds

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // Sanitize input on change
        setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        triggerHaptic();

        // Rate limiting check
        const now = Date.now();
        if (now - lastSubmitTime.current < COOLDOWN_PERIOD) {
            const remainingTime = Math.ceil((COOLDOWN_PERIOD - (now - lastSubmitTime.current)) / 1000);
            setError(`⏱️ Please wait ${remainingTime} seconds before sending another message.`);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        // Additional validation
        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        if (formData.name.length < 2) {
            setError("Name must be at least 2 characters long.");
            setLoading(false);
            return;
        }

        if (formData.message.length < 10) {
            setError("Message must be at least 10 characters long.");
            setLoading(false);
            return;
        }

        const projectId = "portfolioweb-14cd5";
        const safeName = formData.name.replace(/\s+/g, '_').substring(0, 50);
        const customId = `${safeName}_${Date.now()}`;
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contacts?documentId=${customId}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: {
                        name: { stringValue: formData.name.substring(0, 50) },
                        email: { stringValue: formData.email.substring(0, 100) },
                        message: { stringValue: formData.message.substring(0, 2000) },
                        timestamp: { timestampValue: new Date().toISOString() },
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message. Please try again.`);
            }

            // --- Send Telegram Notification ---
            const botToken = '8050131416:AAG6kkIBeAzOvukdk0SFekps3maOKN619cc';
            const chatId = '6346052882';
            const telegramText = `🚀 *New Portfolio Lead!*\n\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n💬 *Message:* ${formData.message}`;

            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramText,
                    parse_mode: 'Markdown'
                }),
            });
            // ----------------------------------

            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            lastSubmitTime.current = now; // Update last submit time
        } catch (err: any) {
            setError("❌ " + (err.message || "Something went wrong. Please try again."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 rounded-[32px] p-10 overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-8">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10">
                            <Send className="text-white w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                            Get in Touch
                        </h3>
                    </div>
                    <p className="text-white/60 text-sm tracking-tight flex items-center gap-2">
                        <Shield className="w-4 h-4" strokeWidth={1.5} />
                        Secure & encrypted contact form
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-400/30 text-red-300 rounded-2xl mb-6 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white/80 mb-2.5 flex items-center gap-2 tracking-tight"
                        >
                            <User className="w-4 h-4" strokeWidth={1.5} />
                            Name
                            <span className="text-xs text-white/40 ml-auto">{formData.name.length}/50</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            minLength={2}
                            maxLength={50}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-transparent backdrop-blur-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all duration-300"
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white/80 mb-2.5 flex items-center gap-2 tracking-tight"
                        >
                            <Mail className="w-4 h-4" strokeWidth={1.5} />
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={100}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-transparent backdrop-blur-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all duration-300"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-white/80 mb-2.5 flex items-center gap-2 tracking-tight"
                        >
                            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                            Message
                            <span className="text-xs text-white/40 ml-auto">{formData.message.length}/2000</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            minLength={10}
                            maxLength={2000}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-transparent backdrop-blur-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all duration-300 resize-none"
                            placeholder="Your message"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-full font-semibold text-base transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-black/20 border border-white/20 tracking-tight"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
                                Sending
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" strokeWidth={1.5} />
                                Send Message
                            </>
                        )}
                    </button>

                    {/* Success Message */}
                    {success && (
                        <div className="p-4 bg-green-500/10 border border-green-400/30 text-green-300 rounded-2xl text-center font-medium flex items-center justify-center gap-2 backdrop-blur-sm">
                            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                            Message sent successfully!
                        </div>
                    )}
                </form>

                {/* Security Notice */}
                <p className="text-white/30 text-xs mt-6 text-center tracking-tight">
                    🔒 Your information is protected by input validation and rate limiting
                </p>
            </div>
        </div>
    );
}
