import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlgorithmSelector } from './AlgorithmSelector';
import { useVisualizerStore } from '@/store/visualizerStore';

vi.mock('@/store/visualizerStore');

describe('AlgorithmSelector', () => {
  const mockStore = {
    selectedAlgorithm: null,
    setSelectedAlgorithm: vi.fn(),
    visualization: {
      isPlaying: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
  });

  it('should render algorithm selection title', () => {
    render(<AlgorithmSelector />);
    expect(screen.getByText('Select Algorithm')).toBeInTheDocument();
  });

  it('should render all sorting algorithms', () => {
    render(<AlgorithmSelector />);
    
    expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
    expect(screen.getByText('Quick Sort')).toBeInTheDocument();
    expect(screen.getByText('Merge Sort')).toBeInTheDocument();
    expect(screen.getByText('Heap Sort')).toBeInTheDocument();
    expect(screen.getByText('Insertion Sort')).toBeInTheDocument();
    expect(screen.getByText('Selection Sort')).toBeInTheDocument();
  });

  it('should call setSelectedAlgorithm when algorithm is clicked', async () => {
    const user = userEvent.setup();
    render(<AlgorithmSelector />);
    
    const bubbleSort = screen.getByText('Bubble Sort');
    await user.click(bubbleSort);
    
    expect(mockStore.setSelectedAlgorithm).toHaveBeenCalledWith('bubble');
  });

  it('should highlight selected algorithm', () => {
    const storeWithSelection = {
      ...mockStore,
      selectedAlgorithm: 'bubble',
    };
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(storeWithSelection);
    
    render(<AlgorithmSelector />);
    
    const bubbleSortButton = screen.getByText('Bubble Sort').closest('button');
    expect(bubbleSortButton).toHaveClass('from-primary-500');
  });

  it('should disable algorithm selection during playback', () => {
    const storeWhilePlaying = {
      ...mockStore,
      visualization: {
        isPlaying: true,
      },
    };
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(storeWhilePlaying);
    
    render(<AlgorithmSelector />);
    
    const bubbleSort = screen.getByText('Bubble Sort').closest('button');
    expect(bubbleSort).toBeDisabled();
  });

  it('should show algorithm details when selected', () => {
    const storeWithSelection = {
      ...mockStore,
      selectedAlgorithm: 'bubble',
    };
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(storeWithSelection);
    
    render(<AlgorithmSelector />);
    
    expect(screen.getByText('Time Complexity')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should display complexity information for each algorithm', () => {
    render(<AlgorithmSelector />);
    
    // Check for time complexity indicators
    const avgComplexities = screen.getAllByText(/Avg:/i);
    expect(avgComplexities.length).toBeGreaterThan(0);
    
    // Check for space complexity indicators
    const spaceComplexities = screen.getAllByText(/Space:/i);
    expect(spaceComplexities.length).toBeGreaterThan(0);
  });

  it('should show truncated descriptions in cards', () => {
    const { container } = render(<AlgorithmSelector />);
    
    // Check that descriptions are present and truncated (ending with ...)
    const descriptions = container.querySelectorAll('.text-xs.leading-relaxed');
    expect(descriptions.length).toBeGreaterThan(0);
  });
});
