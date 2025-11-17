import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('should render theme toggle button', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    expect(document.documentElement.classList.contains('dark') || 
           document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should show appropriate title based on current theme', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    expect(button.title).toMatch(/Switch to (dark|light) mode/);
  });
});
