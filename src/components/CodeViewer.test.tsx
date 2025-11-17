import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CodeViewer } from '@/components/CodeViewer';
import { useVisualizerStore } from '@/store/visualizerStore';

vi.mock('@/store/visualizerStore');

describe('CodeViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render code viewer title', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: null,
    });

    render(<CodeViewer />);
    expect(screen.getByText('Code Implementation')).toBeInTheDocument();
  });

  it('should show message when no algorithm selected', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: null,
    });

    render(<CodeViewer />);
    expect(screen.getByText('Select an algorithm to view its implementation')).toBeInTheDocument();
  });

  it('should display bubble sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'bubble',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function bubbleSort/)).toBeInTheDocument();
  });

  it('should display quick sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'quick',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function quickSort/)).toBeInTheDocument();
    expect(screen.getByText(/function partition/)).toBeInTheDocument();
  });

  it('should display merge sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'merge',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function mergeSort/)).toBeInTheDocument();
    expect(screen.getAllByText(/function merge/).length).toBeGreaterThan(0);
  });

  it('should display insertion sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'insertion',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function insertionSort/)).toBeInTheDocument();
  });

  it('should display selection sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'selection',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function selectionSort/)).toBeInTheDocument();
  });

  it('should display heap sort code', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'heap',
    });

    render(<CodeViewer />);
    expect(screen.getByText(/function heapSort/)).toBeInTheDocument();
    expect(screen.getByText(/function heapify/)).toBeInTheDocument();
  });

  it('should display line numbers', () => {
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedAlgorithm: 'bubble',
    });

    render(<CodeViewer />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
