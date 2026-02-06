import type { PokemonDetails } from '@/types/pokemon'

const POKE_API_BASE = 'https://pokeapi.co/api/v2'

const pokemonCache = new Map<string, PokemonDetails>()

export async function fetchPokemonDetails(nameOrId: string | number): Promise<PokemonDetails> {
  const cacheKey = String(nameOrId).toLowerCase()

  if (pokemonCache.has(cacheKey)) {
    return pokemonCache.get(cacheKey)!
  }

  const response = await fetch(`${POKE_API_BASE}/pokemon/${cacheKey}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon: ${nameOrId}`)
  }

  const data: PokemonDetails = await response.json()

  pokemonCache.set(cacheKey, data)

  return data
}

export function getPokemonSprite(pokemon: PokemonDetails): string {
  return pokemon.sprites.front_default || ''
}
