import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const coupleCodeSchema = z
  .string()
  .length(6)
  .regex(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/)

export { credentialsSchema, coupleCodeSchema }
