import { describe, it, expect } from 'vitest';
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  heapSort,
} from './sorting';

describe('Sorting Algorithms', () => {
  const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
  const sortedArray = [11, 12, 22, 25, 34, 64, 90];
  const reverseArray = [90, 64, 34, 25, 22, 12, 11];
  const singleElement = [42];
  const duplicates = [5, 2, 8, 2, 9, 1, 5];

  describe('bubbleSort', () => {
    it('should sort an unsorted array', () => {
      const result = bubbleSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = bubbleSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle reverse sorted array', () => {
      const result = bubbleSort(reverseArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = bubbleSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = bubbleSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });

    it('should generate visualization steps', () => {
      const result = bubbleSort(unsortedArray);
      expect(result.steps).toBeDefined();
      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.steps[0]).toHaveProperty('type');
      expect(result.steps[0]).toHaveProperty('description');
    });
  });

  describe('quickSort', () => {
    it('should sort an unsorted array', () => {
      const result = quickSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = quickSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = quickSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = quickSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });

    it('should include pivot steps', () => {
      const result = quickSort(unsortedArray);
      const pivotSteps = result.steps.filter((step) => step.type === 'pivot');
      expect(pivotSteps.length).toBeGreaterThan(0);
    });
  });

  describe('mergeSort', () => {
    it('should sort an unsorted array', () => {
      const result = mergeSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = mergeSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = mergeSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = mergeSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });

    it('should generate merge steps', () => {
      const result = mergeSort(unsortedArray);
      const compareSteps = result.steps.filter((step) => step.type === 'compare');
      expect(compareSteps.length).toBeGreaterThan(0);
    });
  });

  describe('insertionSort', () => {
    it('should sort an unsorted array', () => {
      const result = insertionSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = insertionSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = insertionSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = insertionSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });
  });

  describe('selectionSort', () => {
    it('should sort an unsorted array', () => {
      const result = selectionSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = selectionSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = selectionSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = selectionSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });
  });

  describe('heapSort', () => {
    it('should sort an unsorted array', () => {
      const result = heapSort(unsortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should handle already sorted array', () => {
      const result = heapSort(sortedArray);
      expect(result.sortedArray).toEqual(sortedArray);
    });

    it('should handle single element', () => {
      const result = heapSort(singleElement);
      expect(result.sortedArray).toEqual(singleElement);
    });

    it('should handle duplicates', () => {
      const result = heapSort(duplicates);
      expect(result.sortedArray).toEqual([1, 2, 2, 5, 5, 8, 9]);
    });
  });

  // Edge cases for all algorithms
  describe('Edge Cases', () => {
    const algorithms = {
      bubbleSort,
      quickSort,
      mergeSort,
      insertionSort,
      selectionSort,
      heapSort,
    };

    Object.entries(algorithms).forEach(([name, sortFn]) => {
      describe(name, () => {
        it('should handle empty array', () => {
          const result = sortFn([]);
          expect(result.sortedArray).toEqual([]);
        });

        it('should handle two elements', () => {
          const result = sortFn([2, 1]);
          expect(result.sortedArray).toEqual([1, 2]);
        });

        it('should handle all same elements', () => {
          const result = sortFn([5, 5, 5, 5]);
          expect(result.sortedArray).toEqual([5, 5, 5, 5]);
        });

        it('should handle negative numbers', () => {
          const result = sortFn([-5, 3, -1, 0, 8]);
          expect(result.sortedArray).toEqual([-5, -1, 0, 3, 8]);
        });

        it('should not modify original array', () => {
          const original = [3, 1, 2];
          const copy = [...original];
          sortFn(original);
          expect(original).toEqual(copy);
        });
      });
    });
  });
});
