import type { DateApiResponse } from '@/types/pokemon'

const TIME_API_URL = 'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw'

export async function fetchCurrentDate(): Promise<DateApiResponse> {
  const response = await fetch(TIME_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch date')
  }

  return response.json()
}
