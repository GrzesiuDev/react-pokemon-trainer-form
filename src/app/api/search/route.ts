import { NextRequest, NextResponse } from 'next/server'
import Fuse, { IFuseOptions } from 'fuse.js'
import pokemonDataFile from '@/data/pokemon.json'
import type { LocalPokemon } from '@/types/pokemon'

const pokemonData: LocalPokemon[] = pokemonDataFile.data

const fuseOptions: IFuseOptions<LocalPokemon> = {
  keys: ['name'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 1,
}

const fuse = new Fuse<LocalPokemon>(pokemonData, fuseOptions)

const searchCache = new Map<string, LocalPokemon[]>()
const CACHE_MAX_SIZE = 100

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get('name')

  if (!name || !name.trim()) {
    return NextResponse.json({ results: pokemonData })
  }

  const query = name.trim().toLowerCase()

  if (searchCache.has(query)) {
    return NextResponse.json({ results: searchCache.get(query) })
  }

  const searchResults = fuse.search(query, { limit: 10 })
  const results = searchResults.map((r) => r.item)

  if (searchCache.size >= CACHE_MAX_SIZE) {
    const firstKey = searchCache.keys().next().value
    if (firstKey) {
      searchCache.delete(firstKey)
    }
  }
  searchCache.set(query, results)

  return NextResponse.json({ results })
}
