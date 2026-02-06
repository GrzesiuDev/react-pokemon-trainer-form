import React from 'react'
import { cn } from '@/lib/utils'

interface PreviewContainerProps {
  children: React.ReactNode
  className?: string
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('rounded-xs border border-gray-200 p-4', className)}>
      <div className="flex items-center justify-center h-48">
        {children}
      </div>
    </div>
  )
}
