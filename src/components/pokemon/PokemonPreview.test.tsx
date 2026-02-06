import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PokemonPreview } from './PokemonPreview'
import type { PokemonDetails } from '@/types/pokemon'

describe('PokemonPreview Component', () => {
  const mockPokemon: PokemonDetails = {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
  }

  it('should display loading state', () => {
    render(<PokemonPreview pokemon={null} isLoading={true} error={null} />)
    expect(screen.getByText('Loading options...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    render(<PokemonPreview pokemon={null} isLoading={false} error="Failed to load" />)
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })

  it('should display empty state when no pokemon', () => {
    render(<PokemonPreview pokemon={null} isLoading={false} error={null} />)
    expect(screen.getByText('Your pokemon')).toBeInTheDocument()
  })

  it('should display pokemon details', () => {
    render(<PokemonPreview pokemon={mockPokemon} isLoading={false} error={null} />)
    
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument()
    expect(screen.getByText(/Electric/i)).toBeInTheDocument()
    expect(screen.getByText(/Base experience: 112/i)).toBeInTheDocument()
    expect(screen.getByText(/Id: 25/i)).toBeInTheDocument()
  })

  it('should display pokemon image', () => {
    render(<PokemonPreview pokemon={mockPokemon} isLoading={false} error={null} />)
    
    const image = screen.getByAltText('Pikachu') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.src).toContain('pikachu.png')
  })

  it('should capitalize pokemon name', () => {
    render(<PokemonPreview pokemon={mockPokemon} isLoading={false} error={null} />)
    expect(screen.getByText('Name: Pikachu')).toBeInTheDocument()
  })

  it('should display multiple types', () => {
    const multiTypePokemon: PokemonDetails = {
      ...mockPokemon,
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: '' },
        },
        {
          slot: 2,
          type: { name: 'poison', url: '' },
        },
      ],
    }

    render(<PokemonPreview pokemon={multiTypePokemon} isLoading={false} error={null} />)
    
    expect(screen.getByText('Grass')).toBeInTheDocument()
    expect(screen.getByText('Poison')).toBeInTheDocument()
  })

  it('should not display image when sprite is null', () => {
    const pokemonWithoutSprite: PokemonDetails = {
      ...mockPokemon,
      sprites: {
        front_default: null,
      },
    }

    render(<PokemonPreview pokemon={pokemonWithoutSprite} isLoading={false} error={null} />)
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <PokemonPreview 
        pokemon={null} 
        isLoading={false} 
        error={null} 
        className="custom-class" 
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
