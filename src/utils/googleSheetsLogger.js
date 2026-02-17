export const logResultToGoogleSheets = async (data) => {
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
        console.warn("Google Script URL not configured (VITE_GOOGLE_SCRIPT_URL is missing). Process skipping.");
        return false;
    }

    console.log("Attempting to log results to:", scriptUrl);

    try {
        // Mode 'no-cors' is required for Google Apps Script Web App calls from browser
        // This means we won't get a readable response, but the POST will succeed.
        await fetch(scriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("Successfully sent data to Google Sheets");
        return true;
    } catch (error) {
        console.error("Failed to log results to Google Sheets:", error);
        return false;
    }
};
