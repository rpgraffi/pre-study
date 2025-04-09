const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;
const VOICE_ID = "UgBBYS2sOqTuMpoF3BR0"; // male
// const VOICE_ID = "v3V1d2rk6528UrLKRuy8"; // female

export async function textToSpeech(text: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          previous_text: "Hey ich bin dein Sprachassistent. Was kann ich für dich tun?",
        //   model_id: "eleven_multilingual_v2",
          model_id: "eleven_flash_v2_5",
          language_code: "de",
          voice_settings: {
            // speed: 1.1
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate speech");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
} 