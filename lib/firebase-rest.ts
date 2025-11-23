const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

/**
 * Adds a document to a Firestore collection using the REST API.
 * This bypasses the Firestore SDK's long-polling/WebChannel connection issues.
 */
export async function addDocumentRest(collectionName: string, data: any) {
    if (!FIREBASE_CONFIG.projectId) {
        throw new Error("Firebase Project ID is missing from environment variables.");
    }

    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/${collectionName}`;

    // Transform simple JSON to Firestore Value format
    const fields = toFirestoreValue(data);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Firestore REST API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return await response.json();
}

/**
 * Helper to convert a standard JS object into Firestore's specific JSON format.
 * e.g. { message: "hi" } -> { message: { stringValue: "hi" } }
 */
function toFirestoreValue(obj: any): any {
    const fields: any = {};

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === "string") {
            fields[key] = { stringValue: value };
        } else if (typeof value === "number") {
            if (Number.isInteger(value)) {
                fields[key] = { integerValue: value };
            } else {
                fields[key] = { doubleValue: value };
            }
        } else if (typeof value === "boolean") {
            fields[key] = { booleanValue: value };
        } else if (value instanceof Date) {
            fields[key] = { timestampValue: value.toISOString() };
        } else if (Array.isArray(value)) {
            // Simplified array handling (assuming array of strings for now)
            fields[key] = {
                arrayValue: {
                    values: value.map(v => ({ stringValue: String(v) }))
                }
            };
        } else if (value === null) {
            fields[key] = { nullValue: null };
        } else if (typeof value === "object") {
            // Recursive call for nested objects
            fields[key] = { mapValue: { fields: toFirestoreValue(value) } };
        }
    }

    return fields;
}
