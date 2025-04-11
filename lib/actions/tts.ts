'use server';

import { openAITextToSpeech } from '@/lib/openai-tts-service'; // Assuming lib is aliased to @/lib

// Define the type for the options based on your existing service
type VoiceOption = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' | 'coral' | 'sage' | 'ash' | 'ballad';
interface OpenAITTSOptions {
  voice?: VoiceOption;
  model?: string;
  instructions?: string;
  responseFormat?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';
}

export async function generateSpeechAction(
  text: string,
  options: OpenAITTSOptions = {}
): Promise<{ audioUrl?: string; error?: string }> {
  try {
    // The openAITextToSpeech function runs securely on the server here
    const audioUrl = await openAITextToSpeech(text, options);
    return { audioUrl };
  } catch (error) {
    console.error('Error in generateSpeechAction:', error);
    // Return an error object to the client for handling
    return { error: error instanceof Error ? error.message : 'Failed to generate speech' };
  }
} 