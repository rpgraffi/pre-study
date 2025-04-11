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

export async function analyzeKanbanAction(columns: Column[]): Promise<{ response?: string; error?: string }> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are a voice assistant in a car for a study. You review information pieces with a specific use case and then try to build a logical and very consice sentence (audio response) only based on the snippets provided. Snippets from the "Essential" must be included in the sentence, "Semi Important" snippets are optional but if included very briefly. IMPORTANT: ONLY REPLY WITH THE SENTENCE, NOTHING ELSE. RESPOND ONLY IN GERMAN. WRITE OUT ABBREVATIONS LIKE "kwh" or "km". WRITE NUMBERS AS NUMBERS like "100" instead of "one hundred". DONT USE A DIFFERENT LANGUAGE THAN GERMAN.`
    });

    const chat = model.startChat({
      generationConfig
    });

    // Format the tasks for the prompt
    const formattedTasks = columns
      .filter(column => column.id === "essential")
      .map(column => {
        const tasksList = column.tasks.map(task => `- ${task.title} (${task.description}) in step ${task.step}`).join('\n');
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