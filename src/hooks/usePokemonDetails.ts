import { useState, useEffect } from 'react'
import { fetchPokemonDetails } from '@/services/pokemonApi'
import { ERROR_MESSAGES } from '@/constants/messages'
import type { PokemonDetails } from '@/types/pokemon'

export function usePokemonDetails(pokemonName: string | null) {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pokemonName) {
      setPokemon(null)
      setError(null)
      return
    }

    let isMounted = true
    const normalizedName = pokemonName.toLowerCase()

    async function loadPokemon() {
      setIsLoading(true)
      setError(null)

      try {
        const details = await fetchPokemonDetails(normalizedName)
        if (isMounted) {
          setPokemon(details)
        }
      } catch {
        if (isMounted) {
          setError(ERROR_MESSAGES.POKEMON_LOAD_FAILED)
          setPokemon(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPokemon()

    return () => {
      isMounted = false
    }
  }, [pokemonName])

  return { pokemon, isLoading, error }
}
