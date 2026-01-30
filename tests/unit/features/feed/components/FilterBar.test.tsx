import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';
import { describe, it, expect, vi } from 'vitest';

describe('FilterBar', () => {
  const mockOnFilterChange = vi.fn();

  it('renders all select options', () => {
    render(<FilterBar filter={{}} onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByLabelText('Residence Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Light Direction')).toBeInTheDocument();
    expect(screen.getByLabelText('Experience Level')).toBeInTheDocument();
  });

  it('calls onFilterChange when selection changes', () => {
    render(<FilterBar filter={{}} onFilterChange={mockOnFilterChange} />);
    
    fireEvent.change(screen.getByLabelText('Residence Type'), { target: { value: 'APARTMENT' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ residenceType: 'APARTMENT' });
  });

  it('shows clear button when filters are active', () => {
    render(<FilterBar filter={{ residenceType: 'APARTMENT' }} onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('clears filters when clear button is clicked', () => {
    render(<FilterBar filter={{ residenceType: 'APARTMENT' }} onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });
});
