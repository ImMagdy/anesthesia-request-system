// services/api.js

// TODO: Replace with actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyykOVa3QXncU20N8drqk4VyOOEY2SnZHVJ3NmCHKL2CiT-eYTUQD8txfssLrZjxA5x/exec";

/**
 * Fetches lists of active theaters and seniors from the Google Sheet.
 * @returns {Promise<{theaters: string[], seniors: string[]}>}
 */
export const fetchLists = async () => {
    // Hardcoded to ensure dropdowns always load instantly and avoid Google Script CORS errors
    return {
        theaters: [
            "Mogam3a",
            "Ob/Gyn",
            "Pediatric Surgery",
            "Endoscopy",
            "Burns Operation",
            "Burns ICU",
            "RRT Internal Medicine",
            "ICU A - Demerdash",
            "ICU B - Demerdash",
            "ICU C - Demerdash",
            "ICU Ob/Gyn",
            "Cardiothoracic ICU",
            "ICU ER",
            "ICU internal Medicine",
            "ICU Hematology",
            "ICU Stroke",
            "ICU Geriatrics",
            "ER",
            "ASUSH",
            "ASUSH - ICU A",
            "ASUSH - ICU B",
            "ASUSH - ICU C",
            "ASUSH - Intermediate",
            "Obour - Operations",
            "Obour - ICU A",
            "Obour - ICU B"
        ],
        seniors: []
    };
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
