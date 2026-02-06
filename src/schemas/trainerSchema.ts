import * as Yup from 'yup'
import { VALIDATION_MESSAGES } from '@/constants/messages'

export const trainerSchema = Yup.object().shape({
  trainerName: Yup.string()
    .required(VALIDATION_MESSAGES.TRAINER_NAME)
    .min(2, VALIDATION_MESSAGES.TRAINER_NAME)
    .max(20, VALIDATION_MESSAGES.TRAINER_NAME),

  trainerAge: Yup.number()
    .typeError(VALIDATION_MESSAGES.TRAINER_AGE)
    .required(VALIDATION_MESSAGES.TRAINER_AGE)
    .min(16, VALIDATION_MESSAGES.TRAINER_AGE)
    .max(99, VALIDATION_MESSAGES.TRAINER_AGE),

  pokemonName: Yup.string().required(VALIDATION_MESSAGES.POKEMON_NAME),
})

export const initialFormValues = {
  trainerName: '',
  trainerAge: '',
  pokemonName: '',
}
