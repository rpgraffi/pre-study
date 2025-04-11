const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

type VoiceOption = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' | 'coral' | 'sage' | 'ash' | 'ballad';

interface OpenAITTSOptions {
  voice?: VoiceOption;
  model?: string;
  instructions?: string;
  responseFormat?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';
}

export async function openAITextToSpeech(
  text: string,
  options: OpenAITTSOptions = {}
): Promise<string> {
  try {
    const {
      voice = 'echo',
      model = 'gpt-4o-mini-tts',
      instructions = 'Du bist ein Sprachassistent, der schnell und freundlich spricht. Du befindeest dich in einem Fahrzeug und sprichst mit dem Fahrer. Relaxed and reassuring, keeping things light even when the customer is frustrated.',
      responseFormat = 'mp3'
    } = options;

    const response = await fetch(
      'https://api.openai.com/v1/audio/speech',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          input: text,
          voice,
          instructions,
          response_format: responseFormat,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI TTS API error:', errorData);
      throw new Error(`Failed to generate speech: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    return `data:audio/mp3;base64,${base64Audio}`;
  } catch (error) {
    console.error('Error generating speech with OpenAI:', error);
    throw error;
  }
} 