import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import { useState } from 'react';

export const CustomArrayInput = () => {
  const { setCustomArray, arraySize } = useVisualizerStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Please enter some values');
      return;
    }

    const values = trimmed.split(/[,\s]+/).map(v => {
      const num = parseInt(v, 10);
      if (isNaN(num)) {
        throw new Error(`Invalid number: ${v}`);
      }
      return num;
    });

    if (values.length < 2) {
      setError('Please enter at least 2 values');
      return;
    }

    if (values.length > 100) {
      setError('Maximum 100 values allowed');
      return;
    }

    try {
      setCustomArray(values);
      setInputValue('');
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  const generatePreset = (type: 'random' | 'sorted' | 'reverse' | 'nearly' | 'few-unique') => {
    const size = arraySize;
    let values: number[];

    switch (type) {
      case 'random':
        values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        break;
      case 'sorted':
        values = Array.from({ length: size }, (_, i) => i + 1);
        break;
      case 'reverse':
        values = Array.from({ length: size }, (_, i) => size - i);
        break;
      case 'nearly': {
        values = Array.from({ length: size }, (_, i) => i + 1);
        // Swap a few random elements
        for (let i = 0; i < Math.floor(size * 0.1); i++) {
          const idx1 = Math.floor(Math.random() * size);
          const idx2 = Math.floor(Math.random() * size);
          [values[idx1], values[idx2]] = [values[idx2], values[idx1]];
        }
        break;
      }
      case 'few-unique': {
        const uniqueValues = [10, 20, 30, 40, 50];
        values = Array.from({ length: size }, () => 
          uniqueValues[Math.floor(Math.random() * uniqueValues.length)]
        );
        break;
      }
    }

    setCustomArray(values);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Custom Array
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="absolute top-full mt-2 right-0 w-96 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl z-50"
            >
              <h3 className="text-lg font-bold text-white mb-4">Custom Array Input</h3>
              
              <div className="mb-4">
                <label className="text-sm text-white/70 mb-2 block">
                  Enter numbers (comma or space separated)
                </label>
                <textarea
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError('');
                  }}
                  placeholder="5, 2, 8, 1, 9 or 5 2 8 1 9"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  rows={3}
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <motion.button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply
                </motion.button>
                <motion.button
                  onClick={() => {
                    setInputValue('');
                    setError('');
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Quick Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'random' as const, label: 'Random', icon: '🎲' },
                    { type: 'sorted' as const, label: 'Sorted', icon: '📈' },
                    { type: 'reverse' as const, label: 'Reversed', icon: '📉' },
                    { type: 'nearly' as const, label: 'Nearly Sorted', icon: '📊' },
                    { type: 'few-unique' as const, label: 'Few Unique', icon: '🎯' },
                  ].map((preset) => (
                    <motion.button
                      key={preset.type}
                      onClick={() => {
                        generatePreset(preset.type);
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="mr-2">{preset.icon}</span>
                      {preset.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
