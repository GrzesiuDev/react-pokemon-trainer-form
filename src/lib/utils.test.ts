import { describe, it, expect } from 'vitest'
import { cn, capitalize } from './utils'

describe('Utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toContain('base')
      expect(result).toContain('conditional')
      expect(result).not.toContain('hidden')
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toContain('base')
      expect(result).toContain('end')
    })

    it('should merge tailwind classes correctly', () => {
      const result = cn('p-4', 'p-8')
      // Should keep only p-8 due to tailwind-merge
      expect(result).toBe('p-8')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should handle already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should only capitalize first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world')
    })

    it('should handle uppercase string', () => {
      expect(capitalize('HELLO')).toBe('HELLO')
    })
  })
})
