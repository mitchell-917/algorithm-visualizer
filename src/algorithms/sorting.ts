import { AlgorithmStep } from '@/types';

export interface SortingResult {
  steps: AlgorithmStep[];
  sortedArray: number[];
}

/**
 * Bubble Sort Algorithm
 * Time: O(n²), Space: O(1)
 */
export const bubbleSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap if out of order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }

    // Mark the last element as sorted
    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      description: `Element ${arr[n - i - 1]} is now in its final position`,
    });

    // Early termination if no swaps occurred
    if (!swapped) break;
  }

  // Mark all remaining elements as sorted
  for (let i = 0; i < n; i++) {
    steps.push({
      type: 'sorted',
      indices: [i],
      description: 'Sorting complete',
    });
  }

  return { steps, sortedArray: arr };
};

/**
 * Quick Sort Algorithm
 * Time: O(n log n) average, O(n²) worst, Space: O(log n)
 */
export const quickSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    steps.push({
      type: 'pivot',
      indices: [high],
      description: `Pivot selected: ${pivot}`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            type: 'swap',
            indices: [i, j],
            description: `Swapping ${arr[i]} and ${arr[j]}`,
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      description: `Placing pivot ${pivot} at position ${i + 1}`,
    });

    steps.push({
      type: 'sorted',
      indices: [i + 1],
      description: `Pivot ${pivot} is now in its final position`,
    });

    return i + 1;
  };

  const quickSortHelper = (low: number, high: number): void => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      steps.push({
        type: 'sorted',
        indices: [low],
        description: `Single element at position ${low} is sorted`,
      });
    }
  };

  quickSortHelper(0, arr.length - 1);

  return { steps, sortedArray: arr };
};

/**
 * Merge Sort Algorithm
 * Time: O(n log n), Space: O(n)
 */
export const mergeSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];

  const merge = (left: number, mid: number, right: number): void => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        steps.push({
          type: 'swap',
          indices: [k],
          description: `Placing ${leftArr[i]} at position ${k}`,
        });
        i++;
      } else {
        arr[k] = rightArr[j];
        steps.push({
          type: 'swap',
          indices: [k],
          description: `Placing ${rightArr[j]} at position ${k}`,
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        type: 'swap',
        indices: [k],
        description: `Placing remaining ${leftArr[i]} at position ${k}`,
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        type: 'swap',
        indices: [k],
        description: `Placing remaining ${rightArr[j]} at position ${k}`,
      });
      j++;
      k++;
    }

    // Mark merged section
    for (let idx = left; idx <= right; idx++) {
      steps.push({
        type: 'sorted',
        indices: [idx],
        description: `Merged section [${left}, ${right}]`,
      });
    }
  };

  const mergeSortHelper = (left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, arr.length - 1);

  return { steps, sortedArray: arr };
};

/**
 * Insertion Sort Algorithm
 * Time: O(n²), Space: O(1)
 */
export const insertionSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];

  steps.push({
    type: 'sorted',
    indices: [0],
    description: 'First element is considered sorted',
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      type: 'compare',
      indices: [i],
      description: `Inserting ${key} into sorted portion`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        description: `${arr[j]} > ${key}, shifting right`,
      });

      arr[j + 1] = arr[j];
      steps.push({
        type: 'swap',
        indices: [j + 1],
        description: `Moving ${arr[j]} to position ${j + 1}`,
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      type: 'swap',
      indices: [j + 1],
      description: `Inserting ${key} at position ${j + 1}`,
    });

    steps.push({
      type: 'sorted',
      indices: [i],
      description: `Elements up to position ${i} are now sorted`,
    });
  }

  return { steps, sortedArray: arr };
};

/**
 * Selection Sort Algorithm
 * Time: O(n²), Space: O(1)
 */
export const selectionSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      type: 'compare',
      indices: [i],
      description: `Finding minimum element from position ${i}`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        indices: [minIdx, j],
        description: `Comparing ${arr[minIdx]} and ${arr[j]}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'compare',
          indices: [minIdx],
          description: `New minimum found: ${arr[minIdx]}`,
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        description: `Swapping ${arr[minIdx]} with ${arr[i]}`,
      });
    }

    steps.push({
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its final position`,
    });
  }

  steps.push({
    type: 'sorted',
    indices: [n - 1],
    description: 'Last element is now sorted',
  });

  return { steps, sortedArray: arr };
};

/**
 * Heap Sort Algorithm
 * Time: O(n log n), Space: O(1)
 */
export const heapSort = (array: number[]): SortingResult => {
  const arr = [...array];
  const steps: AlgorithmStep[] = [];
  const n = arr.length;

  const heapify = (size: number, i: number): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      steps.push({
        type: 'compare',
        indices: [largest, left],
        description: `Comparing parent ${arr[largest]} with left child ${arr[left]}`,
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      steps.push({
        type: 'compare',
        indices: [largest, right],
        description: `Comparing ${arr[largest]} with right child ${arr[right]}`,
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, largest],
        description: `Swapping ${arr[largest]} with ${arr[i]} to maintain heap property`,
      });

      heapify(size, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      type: 'compare',
      indices: [i],
      description: `Building max heap from node ${i}`,
    });
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      type: 'swap',
      indices: [0, i],
      description: `Moving maximum ${arr[i]} to position ${i}`,
    });

    steps.push({
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its final position`,
    });

    heapify(i, 0);
  }

  steps.push({
    type: 'sorted',
    indices: [0],
    description: 'Sorting complete',
  });

  return { steps, sortedArray: arr };
};
