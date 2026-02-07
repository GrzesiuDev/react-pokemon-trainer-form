import { cn } from '@/lib/utils'
import { capitalize } from '@/lib/utils'
import { getPokemonSprite } from '@/services/pokemonApi'
import type { PokemonDetails } from '@/types/pokemon'
import React from 'react'
import { PreviewContainer } from '@/components/ui/PreviewContainer'

interface PokemonPreviewProps {
  pokemon: PokemonDetails | null
  isLoading: boolean
  error: string | null
  className?: string
}

export const PokemonPreview: React.FC<PokemonPreviewProps> = ({ pokemon, isLoading, error, className }) => {
  if (isLoading) {
    return (
      <PreviewContainer className={className}>
        <span className="text-gray-400 animate-pulse">Loading options...</span>
      </PreviewContainer>
    )
  }

  if (error) {
    return (
      <PreviewContainer className={className}>
        <span className="text-error">{error}</span>
      </PreviewContainer>
    )
  }

  if (!pokemon) {
    return (
      <PreviewContainer className={className}>
        <span className="text-gray-400">Your pokemon</span>
      </PreviewContainer>
    )
  }

  const spriteUrl = getPokemonSprite(pokemon)
  const displayName = capitalize(pokemon.name)

  return (
    <div className={cn('rounded-xs border border-gray-200 p-4', className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {spriteUrl && (
            <div className="flex items-center justify-center">
              <img src={spriteUrl} alt={displayName} width="200" height="200" loading="lazy" />
            </div>
          )}
          <div className="space-y-1 self-center">
            <div>Name: {displayName}</div>
            <div className="flex gap-2 flex-wrap">
              Type:
              {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name} className="px-3 py-1 text-xs rounded-full bg-primary-light">
                  {capitalize(typeInfo.type.name)}
                </span>
              ))}
            </div>
            <div className="space-y-1">
              <p>Base experience: {pokemon.base_experience}</p>
              <p>Id: {pokemon.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
