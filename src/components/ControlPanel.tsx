import React from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Settings,
} from 'lucide-react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { useSortingVisualization } from '@/hooks/useSortingVisualization';
import { clsx } from 'clsx';

export const ControlPanel: React.FC = () => {
  const {
    visualization,
    generateNewArray,
    startVisualization,
    pauseVisualization,
    resumeVisualization,
    resetVisualization,
    setSpeed,
    nextStep,
    previousStep,
    selectedAlgorithm,
  } = useVisualizerStore();

  const { executeAlgorithm } = useSortingVisualization();

  const handlePlay = () => {
    if (visualization.steps.length === 0) {
      executeAlgorithm();
    }
    startVisualization();
  };

  const handlePauseResume = () => {
    if (visualization.isPaused) {
      resumeVisualization();
    } else {
      pauseVisualization();
    }
  };

  const handleReset = () => {
    resetVisualization();
    generateNewArray(visualization.array.length);
  };

  const handleShuffle = () => {
    generateNewArray(visualization.array.length);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  const isDisabled = !selectedAlgorithm;

  return (
    <motion.div
      className="rounded-xl bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col gap-6">
        {/* Main Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePauseResume}
            disabled={!visualization.isPlaying && !visualization.isPaused}
            className={clsx(
              'rounded-lg p-3 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40',
              visualization.isPlaying || visualization.isPaused
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-500'
            )}
            title={visualization.isPaused ? 'Resume' : 'Pause'}
          >
            <Pause size={20} />
          </button>

          <button
            onClick={handlePlay}
            disabled={isDisabled || visualization.isPlaying || visualization.isComplete}
            className={clsx(
              'rounded-lg p-4 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isDisabled || visualization.isPlaying || visualization.isComplete
                ? 'bg-gray-200 text-gray-500'
                : 'bg-green-500 text-white hover:bg-green-600'
            )}
            title="Play"
          >
            <Play size={24} />
          </button>

          <button
            onClick={handleReset}
            disabled={isDisabled}
            className={clsx(
              'rounded-lg p-3 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isDisabled
                ? 'bg-gray-200 text-gray-500'
                : 'bg-red-500 text-white hover:bg-red-600'
            )}
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Step Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={previousStep}
            disabled={visualization.currentStep === 0 || visualization.isPlaying}
            className={clsx(
              'rounded-lg p-2 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40',
              'bg-primary-500 text-white hover:bg-primary-600'
            )}
            title="Previous Step"
          >
            <SkipBack size={18} />
          </button>

          <div className="min-w-[120px] text-center">
            <p className="text-sm font-medium text-gray-700">
              Step {visualization.currentStep} / {visualization.totalSteps}
            </p>
          </div>

          <button
            onClick={nextStep}
            disabled={
              visualization.currentStep >= visualization.totalSteps - 1 ||
              visualization.isPlaying
            }
            className={clsx(
              'rounded-lg p-2 transition-all duration-200',
              'hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-40',
              'bg-primary-500 text-white hover:bg-primary-600'
            )}
            title="Next Step"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Settings size={16} />
              Speed: {visualization.speed}x
            </label>
            <button
              onClick={handleShuffle}
              disabled={visualization.isPlaying}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm',
                'transition-all duration-200 hover:scale-105 active:scale-95',
                'disabled:cursor-not-allowed disabled:opacity-40',
                'bg-purple-500 text-white hover:bg-purple-600'
              )}
              title="Generate New Array"
            >
              <Shuffle size={16} />
              Shuffle
            </button>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={visualization.speed}
            onChange={handleSpeedChange}
            disabled={visualization.isPlaying}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${
                ((visualization.speed - 1) / 9) * 100
              }%, rgb(229 231 235) ${((visualization.speed - 1) / 9) * 100}%, rgb(229 231 235) 100%)`,
            }}
          />
        </div>

        {/* Current Step Description */}
        {visualization.steps[visualization.currentStep] && (
          <motion.div
            className="rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={visualization.currentStep}
          >
            <p className="text-center text-sm font-medium text-gray-700">
              {visualization.steps[visualization.currentStep].description}
            </p>
          </motion.div>
        )}

        {/* Keyboard Shortcuts Info */}
        <div className="border-t pt-4">
          <p className="mb-2 text-xs font-semibold text-gray-600">Keyboard Shortcuts:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <kbd className="rounded bg-gray-100 px-2 py-1">Space</kbd> Play
            </div>
            <div>
              <kbd className="rounded bg-gray-100 px-2 py-1">R</kbd> Reset
            </div>
            <div>
              <kbd className="rounded bg-gray-100 px-2 py-1">←</kbd> Previous
            </div>
            <div>
              <kbd className="rounded bg-gray-100 px-2 py-1">→</kbd> Next
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
