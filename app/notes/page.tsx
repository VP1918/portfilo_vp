"use client";


import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotesPage() {
    const notes = [
        {
            id: 1,
            title: "My struggle understanding Kubernetes Ingress",
            date: "2025-11-15",
            excerpt: "Why is it so hard to expose a service? Here is what I learned about Ingress Controllers...",
        },
        {
            id: 2,
            title: "Optimizing React Server Components",
            date: "2025-11-10",
            excerpt: "RSC is great, but hydration errors are a pain. Here is how I debugged them.",
        },
    ];

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 md:p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
                    Digital Garden
                </h1>

                <div className="space-y-6">
                    {notes.map((note) => (
                        <div key={note.id} className="group cursor-pointer p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
                                    {note.title}
                                </h2>
                                <span className="text-sm text-neutral-500">{note.date}</span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                {note.excerpt}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
