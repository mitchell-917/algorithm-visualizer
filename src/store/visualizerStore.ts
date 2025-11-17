import { create } from 'zustand';
import type { VisualizerStore, ArrayElement, AlgorithmType, SortingAlgorithm, PathfindingAlgorithm, GridCell, AlgorithmStep } from '@/types';
import { generateRandomArray, generateId } from '@/utils/helpers';

const createInitialArray = (size: number): ArrayElement[] => {
  const values = generateRandomArray(size);
  return values.map((value) => ({
    value,
    id: generateId(),
    state: 'default' as const,
  }));
};

const createInitialGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isStart: false,
      isEnd: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousCell: null,
    }))
  );
};

export const useVisualizerStore = create<VisualizerStore>((set, get) => ({
  algorithmType: 'sorting',
  selectedAlgorithm: null,
  arraySize: 50,
  visualization: {
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 5,
    array: createInitialArray(50),
    grid: createInitialGrid(20, 40),
    steps: [],
  },

  setAlgorithmType: (type: AlgorithmType) => {
    set({ algorithmType: type, selectedAlgorithm: null });
    get().resetVisualization();
  },

  setSelectedAlgorithm: (algorithm: SortingAlgorithm | PathfindingAlgorithm) => {
    set({ selectedAlgorithm: algorithm });
    get().resetVisualization();
  },

  generateNewArray: (size: number) => {
    const newArray = createInitialArray(size);
    set((state) => ({
      visualization: {
        ...state.visualization,
        array: newArray,
        steps: [],
        currentStep: 0,
        totalSteps: 0,
        isComplete: false,
      },
    }));
  },

  generateNewGrid: (rows: number, cols: number) => {
    const newGrid = createInitialGrid(rows, cols);
    set((state) => ({
      visualization: {
        ...state.visualization,
        grid: newGrid,
        steps: [],
        currentStep: 0,
        totalSteps: 0,
        isComplete: false,
      },
    }));
  },

  startVisualization: () => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        isPlaying: true,
        isPaused: false,
      },
    }));
  },

  pauseVisualization: () => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        isPlaying: false,
        isPaused: true,
      },
    }));
  },

  resumeVisualization: () => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        isPlaying: true,
        isPaused: false,
      },
    }));
  },

  resetVisualization: () => {
    const { algorithmType } = get();
    const newArray = createInitialArray(50);

    set((state) => ({
      visualization: {
        ...state.visualization,
        isPlaying: false,
        isPaused: false,
        isComplete: false,
        currentStep: 0,
        totalSteps: 0,
        array: algorithmType === 'sorting' ? newArray : state.visualization.array,
        steps: [],
      },
    }));
  },

  setSpeed: (speed: number) => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        speed,
      },
    }));
  },

  nextStep: () => {
    set((state) => {
      const nextStep = Math.min(
        state.visualization.currentStep + 1,
        state.visualization.totalSteps - 1
      );
      return {
        visualization: {
          ...state.visualization,
          currentStep: nextStep,
          isComplete: nextStep === state.visualization.totalSteps - 1,
        },
      };
    });
  },

  previousStep: () => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        currentStep: Math.max(0, state.visualization.currentStep - 1),
        isComplete: false,
      },
    }));
  },

  updateArray: (array: ArrayElement[]) => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        array,
      },
    }));
  },

  updateGrid: (grid: GridCell[][]) => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        grid,
      },
    }));
  },

  setSteps: (steps: AlgorithmStep[]) => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        steps,
        totalSteps: steps.length,
        currentStep: 0,
      },
    }));
  },

  setCurrentStep: (step: number) => {
    set((state) => ({
      visualization: {
        ...state.visualization,
        currentStep: step,
        isComplete: step === state.visualization.totalSteps - 1,
      },
    }));
  },

  setCustomArray: (values: number[]) => {
    const customArray = values.map((value) => ({
      value,
      id: generateId(),
      state: 'default' as const,
    }));
    set((state) => ({
      arraySize: values.length,
      visualization: {
        ...state.visualization,
        array: customArray,
        steps: [],
        currentStep: 0,
        totalSteps: 0,
        isComplete: false,
      },
    }));
  },
}));
