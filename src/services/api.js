// services/api.js

// TODO: Replace with actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJRrMKCHnhriOAt-RcDMAn6II4yhPiPtEUICBI5VWHccHMJlWuNUNxAzIYDBO5TFgp/exec";

/**
 * Fetches lists of active theaters and seniors from the Google Sheet.
 * @returns {Promise<{theaters: string[], seniors: string[]}>}
 */
export const fetchLists = async () => {
    try {
        // Mock data for development if URL is placeholder
        if (GOOGLE_SCRIPT_URL === "PLACEHOLDER_URL") {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return {
                theaters: [
                    "Main Theater 1", "Main Theater 2",
                    "Obs/Gyn Theater", "Ortho Theater", "Neuro Theater",
                    "Remote: Cath Lab", "Remote: MRI", "Remote: ECT"
                ],
                seniors: [
                    "Dr. Ahmed Ali", "Dr. Sarah Smith", "Dr. Mohamed Ezzat",
                    "Dr. Hoda Nabil", "Dr. Khaled Omar", "Dr. Mona Lisa"
                ]
            };
        }

        const response = await fetch(GOOGLE_SCRIPT_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data; // Expected format: { theaters: [...], seniors: [...] }
    } catch (error) {
        console.error("Failed to fetch lists:", error);
        // Fallback or re-throw depending on desired behavior
        return { theaters: [], seniors: [] };
    }
};

/**
 * Submits the form data to the Google Sheet.
 * @param {Object} formData 
 * @returns {Promise<boolean>} success
 */
export const submitRequest = async (formData) => {
    try {
        console.log("Submitting data:", formData);

        if (GOOGLE_SCRIPT_URL === "PLACEHOLDER_URL") {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return true;
        }

        // Using no-cors mode for Google Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return true;
    } catch (error) {
        console.error("Submission error:", error);
        return false;
    }
};
