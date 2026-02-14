import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export interface GeminiPrediction {
    disease: string;
    confidence: number;
    isHealthy: boolean;
    description: string;
    treatment: string;
}

export const predictDiseaseWithGemini = async (base64Image: string): Promise<GeminiPrediction> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Remove the data area prefix (e.g., "data:image/png;base64,")
        const base64Data = base64Image.split(',')[1];

        const prompt = `
      Analyze this plant leaf image and identify if there is any disease.
      You must respond ONLY with a JSON object in the following format:
      {
        "disease": "Name of disease or 'Healthy'",
        "confidence": number between 0-100,
        "isHealthy": boolean,
        "description": "Short 1-2 sentence description of the disease or health status",
        "treatment": "Recommended treatment or maintenance tip"
      }
      If the image is not a plant leaf, specify that in the disease field and set isHealthy to false.
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg" // The API handles most common formats
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (in case Gemini adds markdown formatting)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            return {
                disease: data.disease,
                confidence: data.confidence || 95,
                isHealthy: data.isHealthy,
                description: data.description,
                treatment: data.treatment
            };
        }

        throw new Error("Invalid response from AI Cloud");
    } catch (error) {
        console.error("Gemini Prediction Error:", error);
        throw error;
    }
};
