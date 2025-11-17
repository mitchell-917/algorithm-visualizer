import { describe, it, expect, beforeEach } from 'vitest';
import { useVisualizerStore } from './visualizerStore';

describe('Visualizer Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useVisualizerStore.getState();
    store.resetVisualization();
  });

  describe('Initial State', () => {
    it('should have correct initial algorithm type', () => {
      const { algorithmType } = useVisualizerStore.getState();
      expect(algorithmType).toBe('sorting');
    });

    it('should have no selected algorithm initially', () => {
      const { selectedAlgorithm } = useVisualizerStore.getState();
      expect(selectedAlgorithm).toBeNull();
    });

    it('should have initial visualization state', () => {
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isPlaying).toBe(false);
      expect(visualization.isPaused).toBe(false);
      expect(visualization.isComplete).toBe(false);
      expect(visualization.currentStep).toBe(0);
      expect(visualization.speed).toBe(5);
    });

    it('should have initial array', () => {
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.array).toBeDefined();
      expect(visualization.array.length).toBe(50);
    });
  });

  describe('setAlgorithmType', () => {
    it('should update algorithm type', () => {
      const { setAlgorithmType } = useVisualizerStore.getState();
      setAlgorithmType('pathfinding');
      
      const { algorithmType } = useVisualizerStore.getState();
      expect(algorithmType).toBe('pathfinding');
    });

    it('should reset selected algorithm when changing type', () => {
      const { setAlgorithmType, setSelectedAlgorithm } = useVisualizerStore.getState();
      
      setSelectedAlgorithm('bubble');
      setAlgorithmType('pathfinding');
      
      const { selectedAlgorithm } = useVisualizerStore.getState();
      expect(selectedAlgorithm).toBeNull();
    });
  });

  describe('setSelectedAlgorithm', () => {
    it('should set selected algorithm', () => {
      const { setSelectedAlgorithm } = useVisualizerStore.getState();
      setSelectedAlgorithm('bubble');
      
      const { selectedAlgorithm } = useVisualizerStore.getState();
      expect(selectedAlgorithm).toBe('bubble');
    });

    it('should reset visualization when selecting algorithm', () => {
      const { setSelectedAlgorithm, setSteps } = useVisualizerStore.getState();
      
      // Set some steps
      setSteps([{ type: 'compare', indices: [0, 1], description: 'test' }]);
      
      // Select new algorithm
      setSelectedAlgorithm('quick');
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.steps).toEqual([]);
    });
  });

  describe('generateNewArray', () => {
    it('should generate array of specified size', () => {
      const { generateNewArray } = useVisualizerStore.getState();
      generateNewArray(30);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.array.length).toBe(30);
    });

    it('should reset steps when generating new array', () => {
      const { generateNewArray, setSteps } = useVisualizerStore.getState();
      
      setSteps([{ type: 'compare', indices: [0, 1], description: 'test' }]);
      generateNewArray(50);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.steps).toEqual([]);
      expect(visualization.currentStep).toBe(0);
    });
  });

  describe('Playback Controls', () => {
    it('should start visualization', () => {
      const { startVisualization } = useVisualizerStore.getState();
      startVisualization();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isPlaying).toBe(true);
      expect(visualization.isPaused).toBe(false);
    });

    it('should pause visualization', () => {
      const { startVisualization, pauseVisualization } = useVisualizerStore.getState();
      
      startVisualization();
      pauseVisualization();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isPlaying).toBe(false);
      expect(visualization.isPaused).toBe(true);
    });

    it('should resume visualization', () => {
      const { startVisualization, pauseVisualization, resumeVisualization } = 
        useVisualizerStore.getState();
      
      startVisualization();
      pauseVisualization();
      resumeVisualization();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isPlaying).toBe(true);
      expect(visualization.isPaused).toBe(false);
    });

    it('should reset visualization', () => {
      const { startVisualization, setCurrentStep, resetVisualization } = 
        useVisualizerStore.getState();
      
      startVisualization();
      setCurrentStep(5);
      resetVisualization();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isPlaying).toBe(false);
      expect(visualization.isPaused).toBe(false);
      expect(visualization.currentStep).toBe(0);
    });
  });

  describe('Speed Control', () => {
    it('should update speed', () => {
      const { setSpeed } = useVisualizerStore.getState();
      setSpeed(8);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.speed).toBe(8);
    });
  });

  describe('Step Navigation', () => {
    beforeEach(() => {
      const { setSteps } = useVisualizerStore.getState();
      setSteps([
        { type: 'compare', indices: [0, 1], description: 'step 1' },
        { type: 'swap', indices: [0, 1], description: 'step 2' },
        { type: 'sorted', indices: [0], description: 'step 3' },
      ]);
    });

    it('should move to next step', () => {
      const { nextStep } = useVisualizerStore.getState();
      nextStep();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.currentStep).toBe(1);
    });

    it('should not exceed total steps', () => {
      const { nextStep } = useVisualizerStore.getState();
      
      // Try to go beyond total steps
      nextStep();
      nextStep();
      nextStep();
      nextStep();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.currentStep).toBe(2); // Last step index
    });

    it('should move to previous step', () => {
      const { nextStep, previousStep } = useVisualizerStore.getState();
      
      nextStep();
      nextStep();
      previousStep();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.currentStep).toBe(1);
    });

    it('should not go below zero', () => {
      const { previousStep } = useVisualizerStore.getState();
      
      previousStep();
      previousStep();
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.currentStep).toBe(0);
    });

    it('should mark as complete on last step', () => {
      const { setCurrentStep } = useVisualizerStore.getState();
      setCurrentStep(2); // Last step
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.isComplete).toBe(true);
    });
  });

  describe('Steps Management', () => {
    it('should set steps and update total', () => {
      const { setSteps } = useVisualizerStore.getState();
      const steps = [
        { type: 'compare' as const, indices: [0, 1], description: 'step 1' },
        { type: 'swap' as const, indices: [0, 1], description: 'step 2' },
      ];
      
      setSteps(steps);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.steps).toEqual(steps);
      expect(visualization.totalSteps).toBe(2);
      expect(visualization.currentStep).toBe(0);
    });
  });

  describe('Array Updates', () => {
    it('should update array', () => {
      const { updateArray } = useVisualizerStore.getState();
      const newArray = [
        { value: 10, id: '1', state: 'default' as const },
        { value: 20, id: '2', state: 'comparing' as const },
      ];
      
      updateArray(newArray);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.array).toEqual(newArray);
    });
  });

  describe('Grid Operations', () => {
    it('should generate new grid', () => {
      const { generateNewGrid } = useVisualizerStore.getState();
      generateNewGrid(10, 15);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.grid.length).toBe(10);
      expect(visualization.grid[0].length).toBe(15);
    });

    it('should update grid', () => {
      const { updateGrid, generateNewGrid } = useVisualizerStore.getState();
      
      generateNewGrid(5, 5);
      const { visualization: initial } = useVisualizerStore.getState();
      const newGrid = initial.grid.map((row) =>
        row.map((cell) => ({ ...cell, isWall: true }))
      );
      
      updateGrid(newGrid);
      
      const { visualization } = useVisualizerStore.getState();
      expect(visualization.grid[0][0].isWall).toBe(true);
    });
  });
});
