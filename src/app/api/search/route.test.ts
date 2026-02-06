import { describe, it, expect, beforeEach } from 'vitest'
import { GET } from './route'
import { NextRequest } from 'next/server'

describe('API Route: /api/search', () => {
  beforeEach(() => {
    // Clear cache between tests
  })

  it('should return all pokemon when name parameter is empty', async () => {
    const request = new NextRequest('http://localhost:3000/api/search')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toBeDefined()
    expect(Array.isArray(data.results)).toBe(true)
    expect(data.results.length).toBeGreaterThan(0)
  })

  it('should return all pokemon when name parameter is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/search')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toBeDefined()
    expect(Array.isArray(data.results)).toBe(true)
  })

  it('should return filtered pokemon when name parameter is provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?name=pika')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toBeDefined()
    expect(Array.isArray(data.results)).toBe(true)
    expect(data.results.length).toBeGreaterThan(0)
    expect(data.results.length).toBeLessThanOrEqual(10)
    
    // Check if results contain "pika" in name
    const hasMatchingName = data.results.some((pokemon: any) => 
      pokemon.name.toLowerCase().includes('pika')
    )
    expect(hasMatchingName).toBe(true)
  })

  it('should return empty array for non-existent pokemon', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?name=nonexistentpokemon12345')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toBeDefined()
    expect(Array.isArray(data.results)).toBe(true)
    expect(data.results.length).toBe(0)
  })

  it('should limit results to 10 items', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?name=a')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results.length).toBeLessThanOrEqual(10)
  })

  it('should handle fuzzy search correctly', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?name=pikacu')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toBeDefined()
    
    // Should find "pikachu" even with typo "pikacu"
    const hasPikachu = data.results.some((pokemon: any) => 
      pokemon.name.toLowerCase() === 'pikachu'
    )
    expect(hasPikachu).toBe(true)
  })

  it('should return pokemon with correct structure', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?name=bulbasaur')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results.length).toBeGreaterThan(0)
    
    const pokemon = data.results[0]
    expect(pokemon).toHaveProperty('id')
    expect(pokemon).toHaveProperty('name')
    expect(typeof pokemon.id).toBe('number')
    expect(typeof pokemon.name).toBe('string')
  })
})
