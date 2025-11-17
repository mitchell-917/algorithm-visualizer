import React from 'react';
import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import { SortingAlgorithm } from '@/types';
import { getAllSortingAlgorithms, getSortingAlgorithmConfig } from '@/config/algorithms';
import { clsx } from 'clsx';
import { Database, TrendingUp } from 'lucide-react';

export const AlgorithmSelector: React.FC = () => {
  const { selectedAlgorithm, setSelectedAlgorithm, visualization } = useVisualizerStore();

  const algorithms = getAllSortingAlgorithms();

  const handleSelect = (algorithm: SortingAlgorithm) => {
    if (!visualization.isPlaying) {
      setSelectedAlgorithm(algorithm);
    }
  };

  return (
    <motion.div
      className="rounded-xl bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="mb-4 text-xl font-bold text-gray-800">Select Algorithm</h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {algorithms.map((algorithm) => {
          const config = getSortingAlgorithmConfig(algorithm);
          const isSelected = selectedAlgorithm === algorithm;

          return (
            <motion.button
              key={algorithm}
              onClick={() => handleSelect(algorithm)}
              disabled={visualization.isPlaying}
              className={clsx(
                'group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300',
                'hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50',
                isSelected
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              )}
              whileHover={{ scale: visualization.isPlaying ? 1 : 1.02 }}
              whileTap={{ scale: visualization.isPlaying ? 1 : 0.98 }}
            >
              <div className="relative z-10">
                <h3 className="mb-2 font-bold">{config.name}</h3>
                <p
                  className={clsx(
                    'mb-3 text-xs leading-relaxed',
                    isSelected ? 'text-white/90' : 'text-gray-600'
                  )}
                >
                  {config.description.slice(0, 80)}...
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className={isSelected ? 'text-white' : 'text-primary-500'} />
                    <span className={isSelected ? 'text-white/80' : 'text-gray-500'}>
                      Avg: {config.timeComplexity.average}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database size={14} className={isSelected ? 'text-white' : 'text-secondary-500'} />
                    <span className={isSelected ? 'text-white/80' : 'text-gray-500'}>
                      Space: {config.spaceComplexity}
                    </span>
                  </div>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700"
                  layoutId="selected-algorithm"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Algorithm Details */}
      {selectedAlgorithm && (
        <motion.div
          className="mt-6 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-3">
            <div>
              <h4 className="mb-1 text-sm font-semibold text-gray-700">Time Complexity</h4>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>
                  Best: <code className="font-mono">{getSortingAlgorithmConfig(selectedAlgorithm as SortingAlgorithm).timeComplexity.best}</code>
                </span>
                <span>
                  Average: <code className="font-mono">{getSortingAlgorithmConfig(selectedAlgorithm as SortingAlgorithm).timeComplexity.average}</code>
                </span>
                <span>
                  Worst: <code className="font-mono">{getSortingAlgorithmConfig(selectedAlgorithm as SortingAlgorithm).timeComplexity.worst}</code>
                </span>
              </div>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-semibold text-gray-700">Description</h4>
              <p className="text-sm text-gray-600">
                {getSortingAlgorithmConfig(selectedAlgorithm as SortingAlgorithm).description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
