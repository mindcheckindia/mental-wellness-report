
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { IndividualData } from './_lib/types.js';

// Initialize the Gemini AI client securely on the server-side.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey });

// Define the expected JSON structure for the AI's response.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        insights: {
            type: Type.ARRAY,
            description: "An array of personalized insight strings, one for each domain provided in the input.",
            items: {
                type: Type.STRING,
                description: "A personalized insight message for a single domain."
            }
        },
    },
    required: ['insights']
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  try {
    const userData: IndividualData = request.body;

    if (!userData || !userData.firstName || !userData.domains) {
        return response.status(400).json({ error: "Invalid user data provided." });
    }
    
    const model = "gemini-2.5-flash";

    const prompt = `
        You are an expert and compassionate clinical psychologist providing feedback on a mental wellness self-assessment.
        The user's name is ${userData.firstName}. Their results are in this JSON object:
        ${JSON.stringify(userData.domains.map(d => ({ name: d.name, interpretation: d.userInterpretation, score: d.score })), null, 2)}

        For each domain, generate a personalized "Insights & Support" message. Your response MUST be a JSON object matching the provided schema. The 'insights' array must have the same number of elements as the input domains.

        Follow this three-part structure for each message, addressing ${userData.firstName} by name:
        1.  **Acknowledge & Validate:** Start by empathetically acknowledging their result without using the exact interpretation label (e.g., for "Moderate," say "It appears you're dealing with a noticeable level of...").
        2.  **Explain Potential Impact:** Briefly and gently explain how these feelings or symptoms might show up in their daily life (e.g., "This can sometimes make it challenging to...").
        3.  **Provide Tiered, Actionable Guidance:**
            - If the interpretation is "Minimal," "None to slight," "None," "Low," or "Healthy," provide positive reinforcement. (e.g., "It's great that you're feeling steady in this area. Continuing to... will help maintain this balance.")
            - If the interpretation is "Mild" or "Some Difficulties," suggest gentle, actionable self-care strategies. (e.g., "Exploring practices like mindfulness, journaling, or talking with a trusted friend can be a helpful next step.")
            - If the interpretation is "Moderate," "Medium," or "High," suggest concrete strategies and gently encourage professional consultation. (e.g., "It may be beneficial to explore this with a professional. A therapist can provide tools and strategies tailored specifically to you.")
            - If the interpretation is "Severe," "High Probability," "High Risk," or indicates "Further inquiry indicated," gently but clearly recommend professional help. (e.g., "These feelings can be very challenging to manage alone. We strongly encourage you to connect with a mental health professional or a trusted doctor to discuss these results and find the best path forward for you.")
            
        Each insight should be professional, supportive, and about 3-4 sentences long. Do not give a diagnosis or use alarmist language.
    `;

    const aiResponse: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
        },
    });

    const jsonText = aiResponse.text.trim();
    const parsedJson = JSON.parse(jsonText);

    if (parsedJson.insights && Array.isArray(parsedJson.insights) && parsedJson.insights.length === userData.domains.length) {
        return response.status(200).json({ insights: parsedJson.insights });
    } else {
        console.error("Generated insights array length does not match domain length.", parsedJson);
        return response.status(500).json({ error: "Failed to generate valid insights from AI model." });
    }

  } catch (error: any) {
    console.error("Error in /api/generate-insights:", error);
    return response.status(500).json({ error: 'An internal server error occurred while generating insights.' });
  }
}