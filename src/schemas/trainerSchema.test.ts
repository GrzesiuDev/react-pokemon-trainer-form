import { describe, it, expect } from 'vitest'
import { trainerSchema, initialFormValues } from './trainerSchema'

describe('Trainer Schema', () => {
  describe('trainerName validation', () => {
    it('should accept valid name', async () => {
      const validData = { trainerName: 'Ash', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should reject empty name', async () => {
      const invalidData = { trainerName: '', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should reject name with less than 2 characters', async () => {
      const invalidData = { trainerName: 'A', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should reject name with more than 20 characters', async () => {
      const invalidData = { trainerName: 'A'.repeat(21), trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should accept name with exactly 2 characters', async () => {
      const validData = { trainerName: 'Ab', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should accept name with exactly 20 characters', async () => {
      const validData = { trainerName: 'A'.repeat(20), trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })
  })

  describe('trainerAge validation', () => {
    it('should accept valid age', async () => {
      const validData = { trainerName: 'Ash', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should reject age below 16', async () => {
      const invalidData = { trainerName: 'Ash', trainerAge: 15, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should reject age above 99', async () => {
      const invalidData = { trainerName: 'Ash', trainerAge: 100, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should accept age exactly 16', async () => {
      const validData = { trainerName: 'Ash', trainerAge: 16, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should accept age exactly 99', async () => {
      const validData = { trainerName: 'Ash', trainerAge: 99, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should reject non-numeric age', async () => {
      const invalidData = { trainerName: 'Ash', trainerAge: 'twenty', pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })

    it('should reject empty age', async () => {
      const invalidData = { trainerName: 'Ash', trainerAge: '', pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })
  })

  describe('pokemonName validation', () => {
    it('should accept valid pokemon name', async () => {
      const validData = { trainerName: 'Ash', trainerAge: 20, pokemonName: 'Pikachu' }
      await expect(trainerSchema.validate(validData)).resolves.toBeDefined()
    })

    it('should reject empty pokemon name', async () => {
      const invalidData = { trainerName: 'Ash', trainerAge: 20, pokemonName: '' }
      await expect(trainerSchema.validate(invalidData)).rejects.toThrow()
    })
  })

  describe('initialFormValues', () => {
    it('should have correct initial values', () => {
      expect(initialFormValues).toEqual({
        trainerName: '',
        trainerAge: '',
        pokemonName: '',
      })
    })
  })
})
