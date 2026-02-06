import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrainerForm } from './TrainerForm'

// Mock hooks
vi.mock('@/hooks/usePokemonSearch', () => ({
  usePokemonSearch: () => ({
    results: [
      { id: 25, name: 'pikachu' },
      { id: 1, name: 'bulbasaur' },
    ],
    isSearching: false,
  }),
}))

vi.mock('@/hooks/usePokemonDetails', () => ({
  usePokemonDetails: (name: string | null) => ({
    pokemon: name ? {
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      sprites: { front_default: 'https://example.com/pikachu.png' },
      types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    } : null,
    isLoading: false,
    error: null,
  }),
}))

vi.mock('@/hooks/useCurrentDate', () => ({
  useCurrentDate: () => ({
    formattedDate: 'Monday, 01.01.2024',
    isLoading: false,
    error: null,
  }),
}))

describe('TrainerForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all form fields', () => {
    render(<TrainerForm />)
    
    expect(screen.getByLabelText(/Trainer's name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Trainer's age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Pokemon name/i)).toBeInTheDocument()
  })

  it('should render submit and reset buttons', () => {
    render(<TrainerForm />)
    
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('should display current date', () => {
    render(<TrainerForm />)
    expect(screen.getByText('Monday, 01.01.2024')).toBeInTheDocument()
  })

  it('should show validation errors on submit with empty fields', async () => {
    const user = userEvent.setup()
    render(<TrainerForm />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Required from 2 to 20 symbols/i)).toBeInTheDocument()
    })
  })

  it('should show error for invalid age', async () => {
    const user = userEvent.setup()
    render(<TrainerForm />)
    
    const nameInput = screen.getByLabelText(/Trainer's name/i)
    const ageInput = screen.getByLabelText(/Trainer's age/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(nameInput, 'Ash')
    await user.type(ageInput, '10')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Age must be between 16 and 99/i)).toBeInTheDocument()
    })
  })

  it('should show error for name too short', async () => {
    const user = userEvent.setup()
    render(<TrainerForm />)
    
    const nameInput = screen.getByLabelText(/Trainer's name/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(nameInput, 'A')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Required from 2 to 20 symbols/i)).toBeInTheDocument()
    })
  })

  it('should reset form when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<TrainerForm />)
    
    const nameInput = screen.getByLabelText(/Trainer's name/i) as HTMLInputElement
    const resetButton = screen.getByRole('button', { name: /reset/i })
    
    await user.type(nameInput, 'Ash')
    expect(nameInput.value).toBe('Ash')
    
    await user.click(resetButton)
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
    })
  })

  it('should display pokemon preview placeholder initially', () => {
    render(<TrainerForm />)
    expect(screen.getByText('Your pokemon')).toBeInTheDocument()
  })
})
