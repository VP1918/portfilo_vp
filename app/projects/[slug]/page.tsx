import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DatabaseTestButton from "@/components/DatabaseTestButton";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Mock data - in a real app, fetch based on slug
    const project = {
        title: "Sentient Docs",
        subtitle: "A Self-Updating Documentation System",
        hook: "Built a RAG system that doesn't just read docs—it rewrites them.",
        metric: "Leveraged Google Antigravity to prototype the backend in 4 hours instead of 4 days.",
        stack: ["Python (FastAPI)", "Gemini / DeepMind", "GitHub Actions"],
        challenge: "The challenge wasn't the AI; it was the context window. I solved this by implementing a custom sliding-window attention mechanism...",
        result: "Reduced documentation drift by 90% and automated 500+ PR reviews.",
    };

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                    {project.title}
                </h1>
                <div className="mb-4">
                    <DatabaseTestButton />
                </div>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
                    {project.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">The Hook</h2>
                            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {project.hook}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">System Design</h2>
                            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden">
                                {/* Placeholder for System Diagram */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex gap-8">
                                            <div className="p-4 border border-neutral-700 rounded bg-neutral-800 text-white">Frontend</div>
                                            <div className="p-4 border border-neutral-700 rounded bg-neutral-800 text-white">API Gateway</div>
                                            <div className="p-4 border border-neutral-700 rounded bg-neutral-800 text-white">LLM Engine</div>
                                        </div>
                                        <div className="h-px w-full bg-neutral-700"></div>
                                        <p className="text-neutral-500 text-sm">Interactive Diagram Placeholder</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">The Hardest Problem</h2>
                            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Impact & Result</h2>
                            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {project.result}
                            </p>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h3 className="font-bold mb-4 text-neutral-900 dark:text-neutral-100">Speed of AI Metric</h3>
                            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">4 Hours</p>
                            <p className="text-sm text-neutral-500 mt-2">Prototype time vs 4 days estimated</p>
                        </div>

                        <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <h3 className="font-bold mb-4 text-neutral-900 dark:text-neutral-100">Tech Stack</h3>
                            <ul className="space-y-3">
                                {project.stack.map((tech) => (
                                    <li key={tech} className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
