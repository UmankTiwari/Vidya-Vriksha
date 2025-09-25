interface VoiceConfig {
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
}

interface VoiceService {
  speak: (text: string, config?: Partial<VoiceConfig>) => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: () => boolean;
  getAvailableVoices: () => SpeechSynthesisVoice[];
  setVoice: (voice: SpeechSynthesisVoice) => void;
}

class WebVoiceService implements VoiceService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;

    // Initialize with default voice
    this.synth.onvoiceschanged = () => {
      this.initializeVoice();
    };

    this.initializeVoice();
  }

  private initializeVoice(): void {
    const voices = this.synth.getVoices();

    // Try to find Hindi voice first, then English
    this.selectedVoice = voices.find(voice =>
      voice.lang.startsWith('hi') // Hindi
    ) || voices.find(voice =>
      voice.lang.startsWith('en') // English
    ) || voices[0] || null;
  }

  speak(text: string, config: Partial<VoiceConfig> = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any current speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Configure voice settings
      const voiceConfig: VoiceConfig = {
        lang: this.selectedVoice?.lang || 'hi-IN',
        rate: 0.8,
        pitch: 1,
        volume: 1,
        ...config
      };

      utterance.lang = voiceConfig.lang;
      utterance.rate = voiceConfig.rate;
      utterance.pitch = voiceConfig.pitch;
      utterance.volume = voiceConfig.volume;

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Set up event handlers
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      // Start speaking
      this.synth.speak(utterance);
    });
  }

  stop(): void {
    this.synth.cancel();
    this.currentUtterance = null;
  }

  pause(): void {
    this.synth.pause();
  }

  resume(): void {
    this.synth.resume();
  }

  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
  }

  // Get language-specific voice
  getVoiceForLanguage(lang: string): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    return voices.find(voice =>
      voice.lang.toLowerCase().startsWith(lang.toLowerCase())
    ) || null;
  }

  // Check if voice is available for language
  isLanguageSupported(lang: string): boolean {
    const voices = this.getAvailableVoices();
    return voices.some(voice =>
      voice.lang.toLowerCase().startsWith(lang.toLowerCase())
    );
  }

  // Get supported languages
  getSupportedLanguages(): string[] {
    const voices = this.getAvailableVoices();
    const languages = voices.map(voice => voice.lang.split('-')[0]);
    return Array.from(new Set(languages));
  }
}

// Language mappings for voice support
export const LANGUAGE_VOICE_MAP: { [key: string]: string } = {
  hindi: 'hi-IN',
  english: 'en-US',
  punjabi: 'pa-IN',
  bengali: 'bn-IN',
  tamil: 'ta-IN',
  gujarati: 'gu-IN',
  marathi: 'mr-IN',
  telugu: 'te-IN',
  kannada: 'kn-IN',
  malayalam: 'ml-IN',
  odia: 'or-IN',
  assamese: 'as-IN',
  urdu: 'ur-IN',
  sanskrit: 'sa-IN'
};

// Create and export the voice service instance
export const voiceService = new WebVoiceService();

// Utility functions for voice operations
export const speakText = async (text: string, language: string = 'hindi'): Promise<void> => {
  const langCode = LANGUAGE_VOICE_MAP[language] || 'hi-IN';

  // Set appropriate voice for language
  const voice = voiceService.getVoiceForLanguage(langCode);
  if (voice) {
    voiceService.setVoice(voice);
  }

  await voiceService.speak(text, { lang: langCode });
};

export const speakMathContent = async (content: string): Promise<void> => {
  // For math content, we might want slower rate and clearer pronunciation
  await voiceService.speak(content, { rate: 0.7, lang: 'hi-IN' });
};

export const speakScienceContent = async (content: string): Promise<void> => {
  // Science content with technical terms
  await voiceService.speak(content, { rate: 0.75, lang: 'hi-IN' });
};

export const stopSpeaking = (): void => {
  voiceService.stop();
};

export const pauseSpeaking = (): void => {
  voiceService.pause();
};

export const resumeSpeaking = (): void => {
  voiceService.resume();
};

export const isSpeaking = (): boolean => {
  return voiceService.isSpeaking();
};

// Hook for React components to use voice functionality
export const useVoice = () => {
  return {
    speak: speakText,
    speakMath: speakMathContent,
    speakScience: speakScienceContent,
    stop: stopSpeaking,
    pause: pauseSpeaking,
    resume: resumeSpeaking,
    isSpeaking: isSpeaking,
    availableVoices: voiceService.getAvailableVoices(),
    supportedLanguages: voiceService.getSupportedLanguages(),
    setVoice: (voice: SpeechSynthesisVoice) => voiceService.setVoice(voice),
  };
};

export default voiceService;
