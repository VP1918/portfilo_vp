"use client";

import { useState } from "react";
import { addDocumentRest } from "@/lib/firebase-rest";
import { Button } from "@/components/ui/button";

export default function DatabaseTestButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleTestConnection = async () => {
        setLoading(true);
        setStatus("idle");
        setMessage("");
        try {
            await addDocumentRest("test_logs", {
                message: "Hello World via REST API",
                timestamp: new Date(),
            });
            setStatus("success");
            setMessage("Success! Check your Firestore 'test_logs' collection.");
        } catch (error: any) {
            console.error("Error adding document: ", error);
            setStatus("error");
            setMessage(`Error: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <Button onClick={handleTestConnection} disabled={loading}>
                {loading ? "Testing..." : "Test Firebase Connection (REST)"}
            </Button>
            {message && (
                <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
