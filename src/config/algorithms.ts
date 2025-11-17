import { AlgorithmConfig, SortingAlgorithm } from '@/types';

export const sortingAlgorithms: Record<SortingAlgorithm, AlgorithmConfig> = {
  bubble: {
    name: 'Bubble Sort',
    type: 'sorting',
    description:
      'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order. The pass through the list is repeated until the list is sorted.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  quick: {
    name: 'Quick Sort',
    type: 'sorting',
    description:
      'Picks an element as pivot and partitions the array around the picked pivot. Places the pivot at its correct position and recursively sorts the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
  },
  merge: {
    name: 'Merge Sort',
    type: 'sorting',
    description:
      'Divides the array into two halves, recursively sorts them, and then merges the two sorted halves into a single sorted array.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
  },
  heap: {
    name: 'Heap Sort',
    type: 'sorting',
    description:
      'Builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and reconstructs the heap until all elements are sorted.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
  },
  insertion: {
    name: 'Insertion Sort',
    type: 'sorting',
    description:
      'Builds the final sorted array one item at a time by inserting each element into its proper position relative to elements already sorted.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  selection: {
    name: 'Selection Sort',
    type: 'sorting',
    description:
      'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
};

export const getSortingAlgorithmConfig = (algorithm: SortingAlgorithm): AlgorithmConfig => {
  return sortingAlgorithms[algorithm];
};

export const getAllSortingAlgorithms = (): SortingAlgorithm[] => {
  return Object.keys(sortingAlgorithms) as SortingAlgorithm[];
};
