import { cn } from '@/lib/utils'
import { capitalize } from '@/lib/utils'
import type { LocalPokemon } from '@/types/pokemon'
import { ChevronDown } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface PokemonAutocompleteProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onSelect: (pokemon: LocalPokemon) => void
  onBlur: () => void
  onFocus: () => void
  results: LocalPokemon[]
  isOpen: boolean
  isSearching: boolean
  error?: string
  touched?: boolean
  className?: string
}

export const PokemonAutocomplete: React.FC<PokemonAutocompleteProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onSelect,
  onBlur,
  onFocus,
  results,
  isOpen,
  isSearching,
  error,
  touched,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const [forceOpen, setForceOpen] = useState(false)

  const showError = touched && error

  const displayItems = results
  const showDropdown = (isOpen || forceOpen) && (displayItems.length > 0 || isSearching)

  const handleToggleDropdown = () => {
    if (isOpen || forceOpen) {
      onBlur()
      setForceOpen(false)
    } else {
      setForceOpen(true)
      inputRef.current?.focus()
      onFocus()
    }
  }

  return (
    <div className={cn('relative flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
          className={cn(
            'h-10 w-full rounded-xs border border-gray-200 px-3 py-2 pr-10 text-sm',
            'placeholder:text-gray-400',
            'focus-ring',
            'transition-colors',
          )}
          placeholder="Start typing or click to browse..."
        />
        <button
          type="button"
          onClick={handleToggleDropdown}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 p-1',
            'text-gray-400 hover:text-gray-500 cursor-pointer transition-colors',
            'focus:outline-none',
          )}
          tabIndex={-1}
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', (isOpen || forceOpen) && 'rotate-180')} />
        </button>
      </div>

      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-xs bg-white shadow-lg"
        >
          {isSearching ? (
            <li className="px-3 py-2 text-sm text-gray-400">Searching...</li>
          ) : displayItems.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-400">No pokemon found</li>
          ) : (
            displayItems.map((pokemon) => (
              <li
                key={pokemon.id}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-primary-light transition-colors"
                onMouseDown={(e) => {
                  e.preventDefault()
                  setForceOpen(false)
                  onSelect(pokemon)
                }}
              >
                {capitalize(pokemon.name)}
              </li>
            ))
          )}
        </ul>
      )}

      {showError && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
