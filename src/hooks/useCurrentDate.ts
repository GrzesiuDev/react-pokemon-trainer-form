import { useState, useEffect } from 'react'
import { fetchCurrentDate } from '@/services/dateApi'
import { formatApiDate, formatLocalDate } from '@/lib/dateFormatter'
import { ERROR_MESSAGES } from '@/constants/messages'

export function useCurrentDate() {
  const [formattedDate, setFormattedDate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDate() {
      try {
        const dateResponse = await fetchCurrentDate()
        if (isMounted) {
          setFormattedDate(formatApiDate(dateResponse))
          setError(null)
        }
      } catch {
        if (isMounted) {
          setFormattedDate(formatLocalDate())
          setError(ERROR_MESSAGES.DATE_FALLBACK)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDate()

    return () => {
      isMounted = false
    }
  }, [])

  return { formattedDate, isLoading, error }
}
