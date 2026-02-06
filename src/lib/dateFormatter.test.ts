import { describe, it, expect } from 'vitest'
import { formatApiDate, formatLocalDate } from './dateFormatter'
import type { DateApiResponse } from '@/types/pokemon'

describe('Date Formatter', () => {
  describe('formatApiDate', () => {
    it('should format date correctly', () => {
      const mockDate: DateApiResponse = {
        year: 2024,
        month: 3,
        day: 15,
        hour: 10,
        minute: 30,
        seconds: 45,
        milliSeconds: 123,
        dateTime: '2024-03-15T10:30:45.123',
        date: '2024-03-15',
        time: '10:30:45',
        timeZone: 'Europe/Warsaw',
        dayOfWeek: 'Friday',
        dstActive: false,
      }

      const result = formatApiDate(mockDate)
      expect(result).toBe('Friday, 15.03.2024')
    })

    it('should pad single digit day and month with zero', () => {
      const mockDate: DateApiResponse = {
        year: 2024,
        month: 1,
        day: 5,
        hour: 10,
        minute: 30,
        seconds: 45,
        milliSeconds: 123,
        dateTime: '2024-01-05T10:30:45.123',
        date: '2024-01-05',
        time: '10:30:45',
        timeZone: 'Europe/Warsaw',
        dayOfWeek: 'Monday',
        dstActive: false,
      }

      const result = formatApiDate(mockDate)
      expect(result).toBe('Monday, 05.01.2024')
    })

    it('should handle double digit day and month', () => {
      const mockDate: DateApiResponse = {
        year: 2024,
        month: 12,
        day: 25,
        hour: 10,
        minute: 30,
        seconds: 45,
        milliSeconds: 123,
        dateTime: '2024-12-25T10:30:45.123',
        date: '2024-12-25',
        time: '10:30:45',
        timeZone: 'Europe/Warsaw',
        dayOfWeek: 'Wednesday',
        dstActive: false,
      }

      const result = formatApiDate(mockDate)
      expect(result).toBe('Wednesday, 25.12.2024')
    })
  })

  describe('formatLocalDate', () => {
    it('should return formatted date string', () => {
      const result = formatLocalDate()
      
      // Check format: "DayName, DD.MM.YYYY"
      expect(result).toMatch(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), \d{2}\.\d{2}\.\d{4}$/)
    })

    it('should return current date', () => {
      const result = formatLocalDate()
      const now = new Date()
      const year = now.getFullYear().toString()
      
      expect(result).toContain(year)
    })
  })
})
