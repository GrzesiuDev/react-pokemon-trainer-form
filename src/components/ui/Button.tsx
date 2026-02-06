import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={cn(
        'flex-1 px-4 py-2 rounded-xs text-sm font-medium transition-colors cursor-pointer',
        'focus-ring',
        variant === 'primary' && [
          'bg-(--color-primary) text-white',
          'hover:bg-(--color-primary-dark)',
        ],
        variant === 'secondary' && [
          'bg-gray-100',
          'hover:bg-gray-200',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
