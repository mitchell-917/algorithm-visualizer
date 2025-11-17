import { useEffect, useRef, useCallback } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { SortingAlgorithm, ArrayElement } from '@/types';
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  heapSort,
} from '@/algorithms/sorting';
import { calculateDelay } from '@/utils/helpers';

export const useSortingVisualization = () => {
  const {
    selectedAlgorithm,
    visualization,
    updateArray,
    setSteps,
    pauseVisualization,
    setCurrentStep,
  } = useVisualizerStore();

  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const executeAlgorithm = () => {
    if (!selectedAlgorithm) return;

    const values = visualization.array.map((el) => el.value);
    let result;

    switch (selectedAlgorithm as SortingAlgorithm) {
      case 'bubble':
        result = bubbleSort(values);
        break;
      case 'quick':
        result = quickSort(values);
        break;
      case 'merge':
        result = mergeSort(values);
        break;
      case 'insertion':
        result = insertionSort(values);
        break;
      case 'selection':
        result = selectionSort(values);
        break;
      case 'heap':
        result = heapSort(values);
        break;
      default:
        return;
    }

    setSteps(result.steps);
  };

  const animate = useCallback(async () => {
    if (!visualization.isPlaying || visualization.currentStep >= visualization.totalSteps) {
      pauseVisualization();
      return;
    }

    const step = visualization.steps[visualization.currentStep];
    const delay = calculateDelay(visualization.speed);

    // Update array state based on step
    const newArray = visualization.array.map((el, idx) => {
      if (step.indices?.includes(idx)) {
        return { ...el, state: step.type as ArrayElement['state'] };
      }
      // Keep sorted state
      if (el.state === 'sorted') {
        return el;
      }
      return { ...el, state: 'default' as const };
    });

    updateArray(newArray);
    setCurrentStep(visualization.currentStep + 1);

    timeoutRef.current = window.setTimeout(() => {
      if (visualization.isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, delay) as unknown as number;
  }, [
    visualization.isPlaying,
    visualization.currentStep,
    visualization.totalSteps,
    visualization.steps,
    visualization.array,
    visualization.speed,
    pauseVisualization,
    updateArray,
    setCurrentStep,
  ]);

  useEffect(() => {
    if (visualization.isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [animate, visualization.isPlaying]);

  return {
    executeAlgorithm,
    isPlaying: visualization.isPlaying,
    currentStep: visualization.currentStep,
    totalSteps: visualization.totalSteps,
  };
};
