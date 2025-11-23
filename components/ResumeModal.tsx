"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop - Enhanced Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-xl cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
                    >
                        {/* Liquid Border Container */}
                        <div className="relative p-[3px] rounded-xl overflow-hidden group shadow-2xl w-full">
                            {/* Spinning Gradient */}
                            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,cyan_360deg)] animate-[spin_4s_linear_infinite] opacity-75" />

                            {/* Inner Content - Scrollable with High Quality */}
                            <div className="relative bg-slate-900 rounded-lg overflow-y-auto max-h-[85vh] border border-slate-800/50 shadow-inner bg-slate-900/50 backdrop-blur-sm">
                                <img
                                    src="/Vishva_Patel_Resume.png"
                                    alt="Vishva Patel Resume"
                                    className="w-full h-auto object-contain mx-auto rounded-lg"
                                    loading="eager"
                                    decoding="sync"
                                />
                            </div>
                        </div>

                        {/* Glass Dock Controls */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 shadow-2xl flex gap-6 hover:scale-105 transition-transform duration-300 z-20"
                        >
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium"
                            >
                                <X className="w-5 h-5" />
                                <span>Close</span>
                            </button>
                            <div className="w-px h-6 bg-white/20 my-auto" />
                            <a
                                href="/Vishva_Patel_Resume.png"
                                download="Vishva_Patel_Resume.png"
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
