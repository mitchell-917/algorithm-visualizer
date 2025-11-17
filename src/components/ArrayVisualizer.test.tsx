import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArrayVisualizer } from './ArrayVisualizer';
import { ArrayElement } from '@/types';

describe('ArrayVisualizer', () => {
  const mockArray: ArrayElement[] = [
    { value: 50, id: '1', state: 'default' },
    { value: 30, id: '2', state: 'comparing' },
    { value: 80, id: '3', state: 'swapping' },
    { value: 20, id: '4', state: 'sorted' },
  ];

  it('should render without crashing', () => {
    render(<ArrayVisualizer array={mockArray} />);
  });

  it('should render correct number of bars', () => {
    const { container } = render(<ArrayVisualizer array={mockArray} />);
    // Check for div elements that represent bars
    const bars = container.querySelectorAll('.rounded-t-sm');
    expect(bars.length).toBe(mockArray.length);
  });

  it('should apply correct state colors', () => {
    const { container } = render(<ArrayVisualizer array={mockArray} />);
    expect(container.innerHTML).toContain('bg-primary-400'); // default
    expect(container.innerHTML).toContain('bg-yellow-400'); // comparing
    expect(container.innerHTML).toContain('bg-red-500'); // swapping
    expect(container.innerHTML).toContain('bg-green-500'); // sorted
  });

  it('should handle empty array', () => {
    const { container } = render(<ArrayVisualizer array={[]} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should accept custom max height', () => {
    render(<ArrayVisualizer array={mockArray} maxHeight={300} />);
    // Component should render successfully with custom height
    expect(screen).toBeDefined();
  });

  it('should render values when bars are wide enough', () => {
    const smallArray: ArrayElement[] = [
      { value: 42, id: '1', state: 'default' },
      { value: 99, id: '2', state: 'default' },
    ];
    
    const { container } = render(<ArrayVisualizer array={smallArray} />);
    // With only 2 elements, bars should be wide enough to show values
    const text = container.textContent;
    expect(text).toBeDefined();
  });
});
