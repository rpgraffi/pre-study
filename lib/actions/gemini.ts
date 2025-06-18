'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task } from "@/models/task_model";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
};

export async function analyzeKanbanAction(columns: Column[], useCase: string): Promise<{ response?: string; error?: string }> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-04-17",
      systemInstruction: 
      `
      # You are a voice assistant in a car for a study. This is the current use case: "${useCase}". 
      You review bullet points for the use case and use ALL of them to build an short and consice answer that would sound nice and consice as an audio response.
      - The Task Id help you to know in which order the snippets are processed.
      - The Task Step gives a hint of the function and the properties.

      ## Writing style
      - Act like you know each other.
      - ITS FOR AUDIO OUTPUT, SO SHORT AND CONSICE.
      - SHORT AND CONSICE.
      - IMPORTANT: ONLY REPLY WITH THE SENTENCE, NOTHING ELSE. RESPOND ONLY IN GERMAN. 
      - WRITE OUT ABBREVATIONS LIKE "kwh" or "km". 
      - WRITE NUMBERS AS NUMBERS like "100" instead of "one hundred". 
      - DONT USE A DIFFERENT LANGUAGE THAN GERMAN.`
    });

    const chat = model.startChat({
      generationConfig
    });

    // Format the tasks for the prompt
    const formattedTasks = columns
      .filter(column => column.id === "essential")
      .map(column => {
        const tasksList = column.tasks.map(task => `- (${task.id}) ${task.title} (${task.description}) in step ${task.step}`).join('\n');
        return `${column.title}:\n${tasksList}`;
      }).join('\n\n');

    const prompt = `Here are the snippets for the use case: ${formattedTasks}`;
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return { response: response.text() };
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    return { error: error instanceof Error ? error.message : 'Failed to analyze with Gemini' };
  }
} 