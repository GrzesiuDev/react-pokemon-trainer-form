import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormInput } from './FormInput'

describe('FormInput Component', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'testInput',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
    onBlur: vi.fn(),
  }

  it('should render input with label', () => {
    render(<FormInput {...defaultProps} />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('should display input value', () => {
    render(<FormInput {...defaultProps} value="test value" />)
    const input = screen.getByLabelText('Test Label') as HTMLInputElement
    expect(input.value).toBe('test value')
  })

  it('should call onChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<FormInput {...defaultProps} onChange={handleChange} />)
    const input = screen.getByLabelText('Test Label')
    
    await user.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('should call onBlur when input loses focus', async () => {
    const handleBlur = vi.fn()
    const user = userEvent.setup()
    
    render(<FormInput {...defaultProps} onBlur={handleBlur} />)
    const input = screen.getByLabelText('Test Label')
    
    await user.click(input)
    await user.tab()
    
    expect(handleBlur).toHaveBeenCalled()
  })

  it('should display error message when touched and has error', () => {
    render(
      <FormInput 
        {...defaultProps} 
        error="This field is required" 
        touched={true} 
      />
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('should not display error when not touched', () => {
    render(
      <FormInput 
        {...defaultProps} 
        error="This field is required" 
        touched={false} 
      />
    )
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument()
  })

  it('should not display error when touched but no error', () => {
    render(<FormInput {...defaultProps} touched={true} />)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    render(<FormInput {...defaultProps} placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should render as number input when type is number', () => {
    render(<FormInput {...defaultProps} type="number" />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('should render as text input by default', () => {
    render(<FormInput {...defaultProps} />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should have focus-ring class', () => {
    render(<FormInput {...defaultProps} />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toHaveClass('focus-ring')
  })
})
