import type { DateApiResponse } from '@/types/pokemon'

export function formatApiDate(dateResponse: DateApiResponse): string {
  const day = String(dateResponse.day).padStart(2, '0')
  const month = String(dateResponse.month).padStart(2, '0')
  const year = dateResponse.year

  return `${dateResponse.dayOfWeek}, ${day}.${month}.${year}`
}

export function formatLocalDate(): string {
  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = days[now.getDay()]
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()

  return `${dayName}, ${day}.${month}.${year}`
}
