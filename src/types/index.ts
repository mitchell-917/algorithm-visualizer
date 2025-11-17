// Algorithm types
export type AlgorithmType = 'sorting' | 'pathfinding' | 'tree';

export type SortingAlgorithm =
  | 'bubble'
  | 'quick'
  | 'merge'
  | 'heap'
  | 'insertion'
  | 'selection';

export type PathfindingAlgorithm = 'dijkstra' | 'astar' | 'bfs' | 'dfs';

// Visualization state
export interface ArrayElement {
  value: number;
  id: string;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'active';
}

export interface GridCell {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousCell: GridCell | null;
}

export interface AlgorithmStep {
  type: 'compare' | 'swap' | 'sorted' | 'pivot' | 'visit' | 'path';
  indices?: number[];
  cells?: { row: number; col: number }[];
  description: string;
}

export interface VisualizationState {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  array: ArrayElement[];
  grid: GridCell[][];
  steps: AlgorithmStep[];
}

// Configuration
export interface AlgorithmConfig {
  name: string;
  type: AlgorithmType;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
}

// Store state
export interface VisualizerStore {
  // State
  algorithmType: AlgorithmType;
  selectedAlgorithm: SortingAlgorithm | PathfindingAlgorithm | null;
  visualization: VisualizationState;

  // Actions
  setAlgorithmType: (type: AlgorithmType) => void;
  setSelectedAlgorithm: (algorithm: SortingAlgorithm | PathfindingAlgorithm) => void;
  generateNewArray: (size: number) => void;
  generateNewGrid: (rows: number, cols: number) => void;
  startVisualization: () => void;
  pauseVisualization: () => void;
  resumeVisualization: () => void;
  resetVisualization: () => void;
  setSpeed: (speed: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateArray: (array: ArrayElement[]) => void;
  updateGrid: (grid: GridCell[][]) => void;
  setSteps: (steps: AlgorithmStep[]) => void;
  setCurrentStep: (step: number) => void;
  setCustomArray: (values: number[]) => void;
  arraySize: number;
}
