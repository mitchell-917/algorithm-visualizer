import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsPanel } from '@/components/SettingsPanel';

describe('SettingsPanel', () => {
  const mockOnAudioToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render settings button', () => {
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    expect(screen.getByTitle('Settings')).toBeInTheDocument();
  });

  it('should open settings panel on click', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  it('should display sound effects toggle', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    await waitFor(() => {
      expect(screen.getByText('Sound Effects')).toBeInTheDocument();
      expect(screen.getByText('Audio feedback during sorting')).toBeInTheDocument();
    });
  });

  it('should toggle audio when switch clicked', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    const toggle = screen.getByRole('button', { name: '' });
    await user.click(toggle);
    
    expect(mockOnAudioToggle).toHaveBeenCalledWith(true);
  });

  it('should show correct toggle state when audio enabled', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={true} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    const toggle = screen.getByRole('button', { name: '' });
    expect(toggle).toHaveClass('bg-primary-500');
  });

  it('should show correct toggle state when audio disabled', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    const toggle = screen.getByRole('button', { name: '' });
    expect(toggle).toHaveClass('bg-white/20');
  });

  it('should close panel when clicking outside', async () => {
    const user = userEvent.setup();
    render(<SettingsPanel audioEnabled={false} onAudioToggle={mockOnAudioToggle} />);
    
    await user.click(screen.getByTitle('Settings'));
    
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      await user.click(backdrop as HTMLElement);
    }
    
    await waitFor(() => {
      expect(screen.queryByText('Audio feedback during sorting')).not.toBeInTheDocument();
    });
  });
});
