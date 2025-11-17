import { useEffect, useRef, useState } from 'react';
import { ArrayElement } from '@/types';

interface UseAudioFeedbackOptions {
  enabled: boolean;
  volume?: number;
}

export const useAudioFeedback = ({ enabled, volume = 0.3 }: UseAudioFeedbackOptions) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (enabled && !audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
        setIsInitialized(true);
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [enabled]);

  const playNote = (frequency: number, duration: number = 0.1) => {
    if (!enabled || !audioContextRef.current || !isInitialized) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  const playSwap = (element1: ArrayElement, element2: ArrayElement) => {
    const freq1 = 200 + element1.value * 10;
    const freq2 = 200 + element2.value * 10;
    playNote(freq1, 0.05);
    setTimeout(() => playNote(freq2, 0.05), 30);
  };

  const playCompare = (element: ArrayElement) => {
    const frequency = 200 + element.value * 8;
    playNote(frequency, 0.04);
  };

  const playSorted = () => {
    // Play ascending scale for completion
    [0, 2, 4, 5, 7, 9, 11, 12].forEach((note, index) => {
      setTimeout(() => {
        const frequency = 261.63 * Math.pow(2, note / 12); // C major scale
        playNote(frequency, 0.2);
      }, index * 80);
    });
  };

  return {
    playSwap,
    playCompare,
    playSorted,
    isInitialized,
  };
};
