import { describe, it, expect } from 'vitest';
import {
  generateRandomArray,
  shuffleArray,
  generateId,
  clamp,
  calculateDelay,
  manhattanDistance,
  euclideanDistance,
  arraysEqual,
  getStateColor,
} from './helpers';

describe('Helper Functions', () => {
  describe('generateRandomArray', () => {
    it('should generate an array of the specified size', () => {
      const size = 10;
      const result = generateRandomArray(size);
      expect(result).toHaveLength(size);
    });

    it('should generate numbers within the specified range', () => {
      const min = 5;
      const max = 100;
      const result = generateRandomArray(50, min, max);
      
      result.forEach((num: number) => {
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
      });
    });

    it('should generate different arrays on subsequent calls', () => {
      const arr1 = generateRandomArray(20);
      const arr2 = generateRandomArray(20);
      expect(arr1).not.toEqual(arr2);
    });
  });

  describe('shuffleArray', () => {
    it('should return an array of the same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it('should contain all original elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      
      input.forEach((item) => {
        expect(result).toContain(item);
      });
    });

    it('should not modify the original array', () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      shuffleArray(input);
      expect(input).toEqual(original);
    });
  });

  describe('generateId', () => {
    it('should generate a unique string', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should generate a non-empty string', () => {
      const id = generateId();
      expect(id).toBeTruthy();
      expect(typeof id).toBe('string');
    });
  });

  describe('clamp', () => {
    it('should return the value if within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(7, 5, 10)).toBe(7);
    });

    it('should return min if value is less than min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(2, 5, 10)).toBe(5);
    });

    it('should return max if value is greater than max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(20, 5, 10)).toBe(10);
    });
  });

  describe('calculateDelay', () => {
    it('should return smaller delays for higher speeds', () => {
      const slow = calculateDelay(1);
      const fast = calculateDelay(10);
      expect(slow).toBeGreaterThan(fast);
    });

    it('should return at least 10ms', () => {
      const result = calculateDelay(10);
      expect(result).toBeGreaterThanOrEqual(10);
    });

    it('should return correct delays for boundary values', () => {
      expect(calculateDelay(1)).toBe(900);
      expect(calculateDelay(10)).toBe(10);
      expect(calculateDelay(5)).toBe(500);
    });
  });

  describe('manhattanDistance', () => {
    it('should calculate correct distance for horizontal line', () => {
      expect(manhattanDistance(0, 0, 5, 0)).toBe(5);
    });

    it('should calculate correct distance for vertical line', () => {
      expect(manhattanDistance(0, 0, 0, 5)).toBe(5);
    });

    it('should calculate correct distance for diagonal', () => {
      expect(manhattanDistance(0, 0, 3, 4)).toBe(7);
    });

    it('should return 0 for same point', () => {
      expect(manhattanDistance(5, 5, 5, 5)).toBe(0);
    });
  });

  describe('euclideanDistance', () => {
    it('should calculate correct distance', () => {
      expect(euclideanDistance(0, 0, 3, 4)).toBe(5);
    });

    it('should return 0 for same point', () => {
      expect(euclideanDistance(5, 5, 5, 5)).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const result = euclideanDistance(-3, -4, 0, 0);
      expect(result).toBeCloseTo(5, 5);
    });
  });

  describe('arraysEqual', () => {
    it('should return true for equal arrays', () => {
      expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(arraysEqual(['a', 'b'], ['a', 'b'])).toBe(true);
    });

    it('should return false for different arrays', () => {
      expect(arraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('should return true for empty arrays', () => {
      expect(arraysEqual([], [])).toBe(true);
    });
  });

  describe('getStateColor', () => {
    it('should return correct colors for each state', () => {
      expect(getStateColor('default')).toBe('bg-primary-400');
      expect(getStateColor('comparing')).toBe('bg-yellow-400');
      expect(getStateColor('swapping')).toBe('bg-red-500');
      expect(getStateColor('sorted')).toBe('bg-green-500');
      expect(getStateColor('pivot')).toBe('bg-purple-500');
      expect(getStateColor('active')).toBe('bg-orange-500');
    });
  });
});
