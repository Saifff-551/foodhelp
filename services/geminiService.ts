import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from '../types';

// Lazy initialization to prevent app crash if API key is missing
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const modelName = 'gemini-3-flash-preview';

/**
 * AI Food Safety Validator
 * Analyzes description and time to give a safety score and handling instructions.
 */
export const analyzeFoodSafety = async (
  description: string,
  preparedTime: string
): Promise<{ score: number; reasoning: string; handlingInstructions: string }> => {
  const ai = getAiClient();
  if (!ai) {
    return {
      score: 0,
      reasoning: "AI service unavailable (Missing API Key).",
      handlingInstructions: "Manual verification required."
    };
  }

  try {
    const prompt = `
      Analyze this food donation for safety and logistical viability.
      Item: ${description}
      Prepared: ${preparedTime}
      
      Output a safety score (0-100), brief reasoning, and specific handling instructions for a rescuer (e.g., "Must keep hot").
      Be strict but realistic for food rescue scenarios.
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            reasoning: { type: Type.STRING },
            handlingInstructions: { type: Type.STRING },
          },
          required: ["score", "reasoning", "handlingInstructions"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      score: result.score || 50,
      reasoning: result.reasoning || "AI could not determine safety.",
      handlingInstructions: result.handlingInstructions || "Handle with caution."
    };

  } catch (error) {
    console.error("Gemini Safety Analysis Failed:", error);
    return {
      score: 0,
      reasoning: "Analysis service unavailable.",
      handlingInstructions: "Manual verification required."
    };
  }
};

/**
 * AI Impact Estimator
 * Calculates equivalent CO2 and Meal value from raw text input.
 */
export const estimateImpact = async (quantityDescription: string): Promise<{ co2SavedKg: number, mealsCount: number }> => {
  const ai = getAiClient();
  if (!ai) {
    return { co2SavedKg: 0, mealsCount: 0 };
  }

  try {
    const prompt = `
      Estimate the environmental impact of this quantity of food: "${quantityDescription}".
      Assume 1 meal = 0.5kg of food.
      Assume 1kg of food waste = 2.5kg CO2e.
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            co2SavedKg: { type: Type.NUMBER },
            mealsCount: { type: Type.INTEGER },
          },
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      co2SavedKg: result.co2SavedKg || 0,
      mealsCount: result.mealsCount || 0
    };

  } catch (e) {
    console.error("Gemini Impact Est Failed", e);
    return { co2SavedKg: 0, mealsCount: 0 };
  }
}