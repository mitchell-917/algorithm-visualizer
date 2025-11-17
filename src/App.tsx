import { motion } from 'framer-motion';
import { useState } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { ArrayVisualizer } from '@/components/ArrayVisualizer';
import { ControlPanel } from '@/components/ControlPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StatisticsPanel } from '@/components/StatisticsPanel';
import { CodeViewer } from '@/components/CodeViewer';
import { CustomArrayInput } from '@/components/CustomArrayInput';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Cpu, Github } from 'lucide-react';

function AppContent() {
  const {
    visualization,
    startVisualization,
    pauseVisualization,
    resetVisualization,
    setSpeed,
    nextStep,
    previousStep,
  } = useVisualizerStore();

  const [audioEnabled, setAudioEnabled] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onPlay: startVisualization,
    onPause: pauseVisualization,
    onReset: resetVisualization,
    onSpeedUp: () => setSpeed(Math.min(10, visualization.speed + 1)),
    onSpeedDown: () => setSpeed(Math.max(1, visualization.speed - 1)),
    onStepForward: nextStep,
    onStepBackward: previousStep,
    enabled: !visualization.isPlaying,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cpu className="h-7 w-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Algorithm Visualizer</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interactive Learning Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SettingsPanel audioEnabled={audioEnabled} onAudioToggle={setAudioEnabled} />
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 transition-all hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Algorithm Selection & Stats */}
          <div className="lg:col-span-3 space-y-6">
            <AlgorithmSelector />
            <StatisticsPanel />
          </div>

          {/* Center Column - Visualization */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visualization Area */}
            <motion.div
              className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 shadow-xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Visualization</h2>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-primary-400"></div>
                    <span className="text-gray-600 dark:text-gray-400">Default</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-yellow-400"></div>
                    <span className="text-gray-600 dark:text-gray-400">Compare</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-red-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Swap</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Sorted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-purple-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Pivot</span>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                <ArrayVisualizer array={visualization.array} maxHeight={360} />
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ControlPanel />
            </motion.div>

            {/* Completion Message */}
            {visualization.isComplete && (
              <motion.div
                className="rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white shadow-xl"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-5xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold">Sorting Complete!</h3>
                  <p className="text-green-100">
                    Finished in {visualization.totalSteps} steps with {visualization.currentStep} operations
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Code Viewer */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CodeViewer />
            </motion.div>
          </div>
        </div>

        {/* Custom Array Input - Floating */}
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <CustomArrayInput />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with React, TypeScript, Tailwind CSS, Framer Motion, and Zustand
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            © 2025 Algorithm Visualizer. Showcasing advanced React patterns and best practices.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
