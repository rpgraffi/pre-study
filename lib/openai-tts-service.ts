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
      instructions = 'Die Stimme soll entspannt, freundlich und sympathisch klingen – wie ein guter Freund, der mitfährt. Der Sprachassistent spricht in einem angenehm flotten, aber nie gehetzten Tempo – lebendig, aber nicht aufdringlich. Die Tonlage ist warm, zugewandt und beruhigend, mit einer natürlichen Intonation. Er reagiert verständnisvoll, auch wenn der Fahrer frustriert ist, und vermittelt stets ein Gefühl von Vertrautheit und positiver Gelassenheit – fast so, als würde man sich schon lange kennen. Der Assistent hält die Stimmung locker, charmant und unterstützend – genau richtig für entspannte Fahrten oder stressige Momente im Straßenverkehr.',
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