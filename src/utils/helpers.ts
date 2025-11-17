/**
 * Generate a random array of numbers
 */
export const generateRandomArray = (size: number, min = 5, max = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Delay execution for animation
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Calculate speed delay based on speed setting (1-10)
 */
export const calculateDelay = (speed: number): number => {
  // Speed 1 = 1000ms, Speed 10 = 10ms
  return Math.max(10, 1000 - speed * 100);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Format time complexity notation
 */
export const formatComplexity = (complexity: string): string => {
  return complexity.replace(/O\(([^)]+)\)/, 'O($1)');
};

/**
 * Calculate Manhattan distance between two points
 */
export const manhattanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Calculate Euclidean distance between two points
 */
export const euclideanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

/**
 * Check if arrays are equal
 */
export const arraysEqual = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};

/**
 * Get color based on state
 */
export const getStateColor = (
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'active'
): string => {
  const colors = {
    default: 'bg-primary-400',
    comparing: 'bg-yellow-400',
    swapping: 'bg-red-500',
    sorted: 'bg-green-500',
    pivot: 'bg-purple-500',
    active: 'bg-orange-500',
  };
  return colors[state] || colors.default;
};
