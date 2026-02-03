'use server';

import { answerQuestion, AnswerQuestionInput, AnswerQuestionOutput } from '@/ai/flows/dynamic-faq';
import { optimizeUploadedImages, OptimizeUploadedImagesInput, OptimizeUploadedImagesOutput } from '@/ai/flows/optimize-uploaded-images';

export async function answerQuestionAction(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
    try {
        const result = await answerQuestion(input);
        return result;
    } catch (error) {
        console.error("Error in answerQuestionAction:", error);
        return { answer: "I'm sorry, but I was unable to process your question at this time." };
    }
}

export async function optimizeImageAction(input: OptimizeUploadedImagesInput): Promise<OptimizeUploadedImagesOutput> {
    try {
        const result = await optimizeUploadedImages(input);
        return result;
    } catch (error) {
        console.error("Error in optimizeImageAction:", error);
        throw new Error("Failed to optimize image.");
    }
}
