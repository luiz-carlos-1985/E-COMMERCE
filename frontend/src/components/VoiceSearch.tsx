import { Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSearch: (text: string) => void;
}

export default function VoiceSearch({ onSearch }: Props) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Navegador não suporta reconhecimento de voz');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onSearch(text);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      className={`p-3 rounded-xl transition ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500'}`}
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
}
