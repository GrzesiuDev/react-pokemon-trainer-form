import React from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'number'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  placeholder?: string
  className?: string
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  className,
}) => {
  const showError = touched && error

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-xs border border-gray-200 px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus-ring',
          'transition-colors',
        )}
      />
      {showError && <span className="text-xs text-(--color-error)">{error}</span>}
    </div>
  )
}
