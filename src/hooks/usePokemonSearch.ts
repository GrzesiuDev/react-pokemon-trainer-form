import type { LocalPokemon } from '@/types/pokemon'
import { useEffect, useState } from 'react'

const DEBOUNCE_DELAY = 300

export function usePokemonSearch(query: string) {
  const [results, setResults] = useState<LocalPokemon[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsSearching(true)

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(async () => {
      try {
        const url = query.trim() 
          ? `/api/search?name=${encodeURIComponent(query)}`
          : '/api/search'
        
        const response = await fetch(url)
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Failed to search pokemon:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query])

  return { results, isSearching }
}
