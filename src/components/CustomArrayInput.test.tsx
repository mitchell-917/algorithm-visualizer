import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomArrayInput } from '@/components/CustomArrayInput';
import { useVisualizerStore } from '@/store/visualizerStore';

vi.mock('@/store/visualizerStore');

describe('CustomArrayInput', () => {
  const mockSetCustomArray = vi.fn();
  const mockStore = {
    setCustomArray: mockSetCustomArray,
    arraySize: 50,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useVisualizerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
  });

  it('should render custom array button', () => {
    render(<CustomArrayInput />);
    expect(screen.getByText('Custom Array')).toBeInTheDocument();
  });

  it('should open modal when button clicked', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    const button = screen.getByText('Custom Array');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Custom Array Input')).toBeInTheDocument();
    });
  });

  it('should accept comma-separated values', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    const textarea = screen.getByPlaceholderText(/5, 2, 8, 1, 9/);
    await user.type(textarea, '5, 2, 8, 1, 9');
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);
    
    expect(mockSetCustomArray).toHaveBeenCalledWith([5, 2, 8, 1, 9]);
  });

  it('should accept space-separated values', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    const textarea = screen.getByPlaceholderText(/5, 2, 8, 1, 9/);
    await user.type(textarea, '5 2 8 1 9');
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);
    
    expect(mockSetCustomArray).toHaveBeenCalledWith([5, 2, 8, 1, 9]);
  });

  it('should show error for empty input', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter some values')).toBeInTheDocument();
    });
  });

  it('should show error for too few values', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    const textarea = screen.getByPlaceholderText(/5, 2, 8, 1, 9/);
    await user.type(textarea, '5');
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter at least 2 values')).toBeInTheDocument();
    });
  });

  it('should close modal on cancel', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Custom Array Input')).not.toBeInTheDocument();
    });
  });

  it('should render preset buttons', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    
    await waitFor(() => {
      expect(screen.getByText('Random')).toBeInTheDocument();
      expect(screen.getByText('Sorted')).toBeInTheDocument();
      expect(screen.getByText('Reversed')).toBeInTheDocument();
      expect(screen.getByText('Nearly Sorted')).toBeInTheDocument();
      expect(screen.getByText('Few Unique')).toBeInTheDocument();
    });
  });

  it('should generate random preset', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    await user.click(screen.getByText('Random'));
    
    expect(mockSetCustomArray).toHaveBeenCalled();
    const callArgs = mockSetCustomArray.mock.calls[0][0];
    expect(Array.isArray(callArgs)).toBe(true);
    expect(callArgs.length).toBe(50);
  });

  it('should generate sorted preset', async () => {
    const user = userEvent.setup();
    render(<CustomArrayInput />);
    
    await user.click(screen.getByText('Custom Array'));
    await user.click(screen.getByText('Sorted'));
    
    expect(mockSetCustomArray).toHaveBeenCalled();
    const callArgs = mockSetCustomArray.mock.calls[0][0];
    expect(callArgs).toEqual([...callArgs].sort((a, b) => a - b));
  });
});
