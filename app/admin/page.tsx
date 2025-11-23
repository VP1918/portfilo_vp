"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export default function AdminPage() {
    const [pin, setPin] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "1234") {
            setIsAuthenticated(true);
            fetchMessages();
        } else {
            alert("Incorrect PIN");
            setPin("");
        }
    };

    const fetchMessages = async () => {
        setLoading(true);
        setError("");
        const projectId = "portfolioweb-14cd5";
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contacts`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            const data = await response.json();

            if (data.documents) {
                const formattedMessages = data.documents.map((doc: any) => {
                    const fields = doc.fields;
                    return {
                        name: fields.name?.stringValue || "N/A",
                        email: fields.email?.stringValue || "N/A",
                        message: fields.message?.stringValue || "N/A",
                        timestamp: fields.timestamp?.timestampValue || new Date().toISOString(),
                    };
                });

                // Sort by timestamp descending (newest first)
                formattedMessages.sort((a: ContactMessage, b: ContactMessage) =>
                    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                );

                setMessages(formattedMessages);
            } else {
                setMessages([]);
            }
        } catch (err: any) {
            console.error("Error fetching messages:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
                <div className="w-full max-w-sm bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                    <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
                        Admin Access
                    </h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <Button type="submit" className="w-full">
                            Unlock
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Contact Messages
                    </h1>
                    <Button onClick={fetchMessages} disabled={loading}>
                        {loading ? "Refreshing..." : "Refresh Data"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Date</th>
                                    <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Name</th>
                                    <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Email</th>
                                    <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {messages.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-neutral-500 dark:text-neutral-400">
                                            No messages found.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.map((msg, index) => (
                                        <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                                                {new Date(msg.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {msg.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                                                {msg.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-md truncate">
                                                {msg.message}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
