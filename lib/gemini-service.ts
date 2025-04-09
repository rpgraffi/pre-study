import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task } from "@/models/task_model";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are a voice assistant in a car for a study. You review information pieces with a specific use case and then try to build a logical and very consice sentence (audio response) only based on the snippets provided. Snippets from the "Essential" must be included in the sentence, "Semi Important" snippets are optional but if included very briefly. IMPORTANT: ONLY REPLY WITH THE SENTENCE, NOTHING ELSE. RESPOND ONLY IN GERMAN. WRITE OUT ABBREVATIONS LIKE "kwh" or "km". WRITE NUMBERS AS NUMBERS like "100" instead of "one hundred". DONT USE A DIFFERENT LANGUAGE THAN GERMAN.`
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
};


export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
}

export async function analyzeKanbanBoard(columns: Column[]) {
  try {

    const chat = model.startChat({
      generationConfig
    });

    // Format the tasks for the prompt
    const formattedTasks = columns
      .filter(column => column.id === "essential" || column.id === "semi-important")
      .map(column => {
        const tasksList = column.tasks.map(task => `- ${task.title} (${task.description}) in step ${task.step}`).join('\n');
        return `${column.title}:\n${tasksList}`;
      }).join('\n\n');

    const userMessage: Message = {
      role: 'user',
      content: `Here are the snippets for the use case: ${formattedTasks}`
    };

    const result = await chat.sendMessageStream(userMessage.content);
    return result;
  } catch (error) {
    console.error("Error analyzing Kanban board:", error);
    throw error;
  }
} 