import { IndividualData } from '../types';

/**
 * --- Live Backend Fetching ---
 * This function fetches the pre-calculated report data from our backend.
 */
export const fetchDynamicReportData = async (submissionId: string): Promise<IndividualData> => {
    console.log(`Fetching live report for Submission ID: ${submissionId}`);

    // This is a relative URL that points to our Vercel backend function.
    const response = await fetch(`/api/report?id=${submissionId}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Submission ID "${submissionId}" not found in our records. Please check the ID and try again.`);
        }
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to fetch the report from the server.';
        throw new Error(errorMessage);
    }

    const data: IndividualData = await response.json();
    console.log('Successfully fetched base report data from the backend.');
    return data;
};


/**
 * --- Secure AI Insight Generation ---
 * This function sends the report data to our secure backend endpoint, which then
 * communicates with the Gemini API. This prevents the API key from being exposed
 * in the user's browser.
 *
 * @param userData The full report data object.
 * @returns An array of strings, where each string is an AI-generated insight.
 */
export const fetchInsights = async (userData: IndividualData): Promise<string[]> => {
    console.log('Requesting AI insights from secure backend endpoint...');
    
    const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send the full user data to the backend
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to generate AI insights.';
        console.error('Error fetching insights:', errorMessage);
        throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Successfully received AI insights.');
    return data.insights; // The backend will return an object like { insights: [...] }
}