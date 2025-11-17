import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import { useMemo } from 'react';

export const StatisticsPanel = () => {
  const { visualization, selectedAlgorithm } = useVisualizerStore();

  const stats = useMemo(() => {
    const { steps, currentStep } = visualization;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < currentStep && i < steps.length; i++) {
      const step = steps[i];
      if (step.type === 'compare') comparisons++;
      if (step.type === 'swap') swaps++;
    }

    return { comparisons, swaps };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualization.steps, visualization.currentStep]);

  const algorithmComplexity = useMemo(() => {
    const complexities: Record<string, { best: string; average: string; worst: string; space: string }> = {
      bubble: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      insertion: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      selection: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      quick: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
      merge: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
      heap: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
    };

    return selectedAlgorithm ? complexities[selectedAlgorithm] : null;
  }, [selectedAlgorithm]);

  const progress = visualization.totalSteps > 0 
    ? (visualization.currentStep / visualization.totalSteps) * 100 
    : 0;

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-4 text-white">Statistics</h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{stats.comparisons}</div>
          <div className="text-sm text-white/60">Comparisons</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{stats.swaps}</div>
          <div className="text-sm text-white/60">Swaps</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{visualization.currentStep}</div>
          <div className="text-sm text-white/60">Current Step</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{visualization.totalSteps}</div>
          <div className="text-sm text-white/60">Total Steps</div>
        </div>
      </div>

      {/* Complexity Analysis */}
      {algorithmComplexity && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white/80">Time Complexity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Best Case:</span>
              <code className="text-green-400 font-mono">{algorithmComplexity.best}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Average Case:</span>
              <code className="text-yellow-400 font-mono">{algorithmComplexity.average}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Worst Case:</span>
              <code className="text-red-400 font-mono">{algorithmComplexity.worst}</code>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className="text-white/60">Space:</span>
              <code className="text-blue-400 font-mono">{algorithmComplexity.space}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
