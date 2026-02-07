
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

export const generateImageWithGemini = async (
  prompt: string,
  aspectRatio: AspectRatio = '1:1',
  isHighQuality: boolean = false
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Use pro model for high quality requests, flash for standard
  const modelName = isHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: isHighQuality ? "1K" : undefined
        }
      },
    });

    // Find the image part in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image was generated in the response.");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
        throw new Error("API Key configuration error or model unavailable. Please check your setup.");
    }
    throw error;
  }
};
