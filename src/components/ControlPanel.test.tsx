import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlPanel } from './ControlPanel';
import { useVisualizerStore } from '@/store/visualizerStore';

// Mock the store
vi.mock('@/store/visualizerStore');
vi.mock('@/hooks/useSortingVisualization', () => ({
  useSortingVisualization: () => ({
    executeAlgorithm: vi.fn(),
    isPlaying: false,
    currentStep: 0,
    totalSteps: 0,
  }),
}));

describe('ControlPanel', () => {
  const mockStore = {
    visualization: {
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      currentStep: 0,
      totalSteps: 10,
      speed: 5,
      array: [],
      grid: [],
      steps: [{ type: 'compare', indices: [0, 1], description: 'Test step' }],
    },
    selectedAlgorithm: 'bubble',
    generateNewArray: vi.fn(),
    startVisualization: vi.fn(),
    pauseVisualization: vi.fn(),
    resumeVisualization: vi.fn(),
    resetVisualization: vi.fn(),
    setSpeed: vi.fn(),
    nextStep: vi.fn(),
    previousStep: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
  });

  it('should render control buttons', () => {
    render(<ControlPanel />);
    
    expect(screen.getByTitle('Play')).toBeInTheDocument();
    expect(screen.getByTitle('Pause')).toBeInTheDocument();
    expect(screen.getByTitle('Reset')).toBeInTheDocument();
  });

  it('should render step controls', () => {
    render(<ControlPanel />);
    
    expect(screen.getByTitle('Previous Step')).toBeInTheDocument();
    expect(screen.getByTitle('Next Step')).toBeInTheDocument();
  });

  it('should display current step information', () => {
    render(<ControlPanel />);
    
    expect(screen.getByText(/Step 0 \/ 10/i)).toBeInTheDocument();
  });

  it('should display speed control', () => {
    render(<ControlPanel />);
    
    expect(screen.getByText(/Speed: 5x/i)).toBeInTheDocument();
  });

  it('should call startVisualization when play is clicked', async () => {
    const user = userEvent.setup();
    render(<ControlPanel />);
    
    const playButton = screen.getByTitle('Play');
    await user.click(playButton);
    
    expect(mockStore.startVisualization).toHaveBeenCalled();
  });

  it('should call resetVisualization when reset is clicked', async () => {
    const user = userEvent.setup();
    render(<ControlPanel />);
    
    const resetButton = screen.getByTitle('Reset');
    await user.click(resetButton);
    
    expect(mockStore.resetVisualization).toHaveBeenCalled();
    expect(mockStore.generateNewArray).toHaveBeenCalled();
  });

  it('should disable controls when no algorithm is selected', () => {
    const storeWithNoAlgorithm = {
      ...mockStore,
      selectedAlgorithm: null,
    };
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(storeWithNoAlgorithm);
    
    render(<ControlPanel />);
    
    const playButton = screen.getByTitle('Play');
    expect(playButton).toBeDisabled();
  });

  it('should display current step description', () => {
    render(<ControlPanel />);
    
    expect(screen.getByText('Test step')).toBeInTheDocument();
  });

  it('should display keyboard shortcuts', () => {
    render(<ControlPanel />);
    
    expect(screen.getByText(/Keyboard Shortcuts:/i)).toBeInTheDocument();
    expect(screen.getByText('Space')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should show shuffle button', () => {
    render(<ControlPanel />);
    
    expect(screen.getByText('Shuffle')).toBeInTheDocument();
  });
});
