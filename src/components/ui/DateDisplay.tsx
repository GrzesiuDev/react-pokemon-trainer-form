import React from 'react'
import { useCurrentDate } from '@/hooks/useCurrentDate'
import { cn } from '@/lib/utils'

interface DateDisplayProps {
  className?: string
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ className }) => {
  const { formattedDate, isLoading } = useCurrentDate()

  if (isLoading) {
    return <div className={cn('text-sm text-muted-foreground animate-pulse', className)}>Loading date...</div>
  }

  return <div className={cn('text-sm text-muted-foreground', className)}>{formattedDate}</div>
}
