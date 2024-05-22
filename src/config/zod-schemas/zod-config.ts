import { z } from 'zod';

const nameValidationPattern = /^[A-Za-z-]+$/;

export const nameSchema = z
  .string()
  .min(2, 'Le nom doit comporter au moins 2 caractères')
  .max(50, 'Le nom doit comporter moins de 50 caractères')
  .regex(nameValidationPattern, "Le nom ne peut contenir que des lettres et des traits d'union");

export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
  .regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/,
    'Le mot de passe doit contenir au moins une lettre majuscule, un caractère spécial (!, @, #, $, %, &, ?) et un chiffre'
  )
  .max(50);
