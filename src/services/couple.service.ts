import { supabase } from '@/lib/supabase'
import type { Couple } from '@/types/couple.types'

const createCouple = async (coupleName: string, user1: string, code: string): Promise<Couple> => {
  const newCouple: Omit<Couple, 'id' | 'createdAt'> = {
    coupleName,
    user1,
    user2: null,
    validated: false,
    code
  }

  const { data, error } = await supabase.from('couples').insert(newCouple).select().single()

  if (error) {
    throw new Error(`Erro ao criar casal: ${error.message}`)
  }

  return data as Couple
}

const validateCode = async (code: string): Promise<Couple | null> => {
  const { data, error } = await supabase.from('couples').select('*').eq('code', code).single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(`Erro ao validar código: ${error.message}`)
  }

  return data as Couple
}

const updateCoupleUser2 = async (coupleId: string, user2: string): Promise<Couple> => {
  const { data, error } = await supabase
    .from('couples')
    .update({ user2, validated: true })
    .eq('id', coupleId)
    .select()
    .single()

  if (error) {
    throw new Error(`Erro ao atualizar casal: ${error.message}`)
  }

  return data as Couple
}

export { createCouple, validateCode, updateCoupleUser2 }
