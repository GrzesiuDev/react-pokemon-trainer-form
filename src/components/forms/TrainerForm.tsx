'use client'

import React, { useState, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { trainerSchema, initialFormValues } from '@/schemas/trainerSchema'
import { FormInput } from './FormInput'
import { PokemonAutocomplete } from './PokemonAutocomplete'
import { PokemonPreview } from '@/components/pokemon/PokemonPreview'
import { SuccessModal } from '@/components/modals/SuccessModal'
import { DateDisplay } from '@/components/ui/DateDisplay'
import { Button } from '@/components/ui/Button'
import { usePokemonSearch } from '@/hooks/usePokemonSearch'
import { usePokemonDetails } from '@/hooks/usePokemonDetails'
import type { LocalPokemon, TrainerFormValues } from '@/types/pokemon'

export const TrainerForm: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pokemonInput, setPokemonInput] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<LocalPokemon | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { results, isSearching } = usePokemonSearch(pokemonInput)
  const {
    pokemon: pokemonDetails,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = usePokemonDetails(selectedPokemon?.name || null)

  const handlePokemonInputChange = useCallback((value: string) => {
    setPokemonInput(value)
    setSelectedPokemon(null)
    setIsDropdownOpen(true)
  }, [])

  const handlePokemonSelect = useCallback(
    (pokemon: LocalPokemon, setFieldValue: (field: string, value: string) => void) => {
      setSelectedPokemon(pokemon)
      setPokemonInput(pokemon.name)
      setFieldValue('pokemonName', pokemon.name)
      setIsDropdownOpen(false)
    },
    [],
  )

  const handleReset = (resetForm: () => void) => {
    resetForm()
    setPokemonInput('')
    setSelectedPokemon(null)
    setShowSuccessModal(false)
    setIsDropdownOpen(false)
  }

  const handleSubmit = (values: TrainerFormValues) => {
    console.log('Form submitted:', values)
    setShowSuccessModal(true)
  }

  return (
    <div className="w-full max-w-160">
      <div className="bg-white rounded-xs border border-gray-200 overflow-hidden px-4 py-8">
        <div className="flex justify-end items-center">
          <DateDisplay />
        </div>

        <Formik
          initialValues={initialFormValues}
          validationSchema={trainerSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, touched, handleChange, handleBlur, resetForm, setFieldValue, setFieldTouched }) => (
            <Form className="p-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <FormInput
                  id="trainerName"
                  name="trainerName"
                  label="Trainer's name"
                  value={values.trainerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.trainerName}
                  touched={touched.trainerName}
                  placeholder="Trainer's name"
                  className="flex-1"
                />
                <FormInput
                  id="trainerAge"
                  name="trainerAge"
                  label="Trainer's age"
                  type="number"
                  value={values.trainerAge}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.trainerAge}
                  touched={touched.trainerAge}
                  placeholder="Trainer's age"
                  className="flex-1"
                />
              </div>
              <PokemonAutocomplete
                id="pokemonName"
                name="pokemonName"
                label="Pokemon name"
                value={pokemonInput}
                onChange={(value) => {
                  handlePokemonInputChange(value)
                  setFieldValue('pokemonName', '')
                }}
                onSelect={(pokemon) => handlePokemonSelect(pokemon, setFieldValue)}
                onBlur={() => {
                  setFieldTouched('pokemonName', true)
                  setTimeout(() => setIsDropdownOpen(false), 200)
                }}
                onFocus={() => {
                  setIsDropdownOpen(true)
                }}
                results={results}
                isOpen={isDropdownOpen}
                isSearching={isSearching}
                error={errors.pokemonName}
                touched={touched.pokemonName}
              />
              <PokemonPreview
                pokemon={pokemonDetails}
                isLoading={isPokemonLoading}
                error={pokemonError}
                className="mt-4"
              />
              <div className="flex justify-end gap-4">
                <Button className="max-w-20" type="button" onClick={() => handleReset(resetForm)} variant="secondary">
                  Reset
                </Button>
                <Button className="max-w-20" type="submit" variant="primary">
                  Submit
                </Button>
              </div>
              <SuccessModal isOpen={showSuccessModal} onReset={() => handleReset(resetForm)} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
