import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatisticsPanel } from '@/components/StatisticsPanel';
import { useVisualizerStore } from '@/store/visualizerStore';

vi.mock('@/store/visualizerStore');

describe('StatisticsPanel', () => {
  const mockStore = {
    visualization: {
      steps: [
        { type: 'compare', indices: [0, 1] },
        { type: 'swap', indices: [0, 1] },
        { type: 'compare', indices: [1, 2] },
        { type: 'swap', indices: [1, 2] },
        { type: 'sorted', indices: [0] },
      ],
      currentStep: 3,
      totalSteps: 5,
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      speed: 5,
      array: [],
      grid: [],
    },
    selectedAlgorithm: 'bubble',
  };

  beforeEach(() => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
  });

  it('should render statistics title', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  it('should display progress percentage', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('60.0%')).toBeInTheDocument();
  });

  it('should display comparison count', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 comparisons up to step 3
    expect(screen.getByText('Comparisons')).toBeInTheDocument();
  });

  it('should display swap count', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 swaps up to step 3
    expect(screen.getByText('Swaps')).toBeInTheDocument();
  });

  it('should display current step', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Current Step')).toBeInTheDocument();
  });

  it('should display total steps', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Total Steps')).toBeInTheDocument();
  });

  it('should display time complexity for selected algorithm', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('Time Complexity')).toBeInTheDocument();
    expect(screen.getByText('O(n)')).toBeInTheDocument(); // best case
    expect(screen.getAllByText('O(n²)').length).toBeGreaterThan(0); // average and worst
  });

  it('should display space complexity', () => {
    render(<StatisticsPanel />);
    expect(screen.getByText('Space:')).toBeInTheDocument();
    expect(screen.getByText('O(1)')).toBeInTheDocument();
  });

  it('should not show complexity when no algorithm selected', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...mockStore,
      selectedAlgorithm: null,
    });

    render(<StatisticsPanel />);
    expect(screen.queryByText('Time Complexity')).not.toBeInTheDocument();
  });

  it('should show correct complexity for quick sort', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...mockStore,
      selectedAlgorithm: 'quick',
    });

    render(<StatisticsPanel />);
    expect(screen.getAllByText('O(n log n)').length).toBeGreaterThan(0);
    expect(screen.getByText('O(log n)')).toBeInTheDocument(); // space
  });
});
