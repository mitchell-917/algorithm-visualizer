import { useCallback, useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onSpeedUp?: () => void;
  onSpeedDown?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onPlay,
  onPause,
  onReset,
  onSpeedUp,
  onSpeedDown,
  onStepForward,
  onStepBackward,
  enabled = true,
}: UseKeyboardShortcutsProps) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Prevent shortcuts when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          if (event.shiftKey) {
            onPause?.();
          } else {
            onPlay?.();
          }
          break;
        case 'r':
          event.preventDefault();
          onReset?.();
          break;
        case 'arrowup':
          event.preventDefault();
          onSpeedUp?.();
          break;
        case 'arrowdown':
          event.preventDefault();
          onSpeedDown?.();
          break;
        case 'arrowright':
          event.preventDefault();
          onStepForward?.();
          break;
        case 'arrowleft':
          event.preventDefault();
          onStepBackward?.();
          break;
      }
    },
    [enabled, onPlay, onPause, onReset, onSpeedUp, onSpeedDown, onStepForward, onStepBackward]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [enabled, handleKeyPress]);
};
