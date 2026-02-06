export interface LocalPokemon {
  id: number
  name: string
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonDetails {
  id: number
  name: string
  base_experience: number
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
  types: PokemonType[]
}

export interface TrainerFormValues {
  trainerName: string
  trainerAge: string
  pokemonName: string
}

export interface DateApiResponse {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  seconds: number
  milliSeconds: number
  dateTime: string
  date: string
  time: string
  timeZone: string
  dayOfWeek: string
  dstActive: boolean
}
