import { supabase } from '@/lib/supabase'
import { createCouple, updateCoupleUser2, validateCode } from '@/services/couple.service'

jest.mock('@/lib/supabase')

describe('couple.service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createCouple', () => {
    it('should create a couple successfully', async () => {
      const mockCouple = {
        id: '123',
        coupleName: 'Test Couple',
        user1: 'João',
        user2: null,
        validated: false,
        code: 'ABC123',
        createdAt: new Date().toISOString()
      }

      ;(supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockCouple, error: null })
          })
        })
      })

      const result = await createCouple('Test Couple', 'João', 'ABC123')

      expect(result).toEqual(mockCouple)
      expect(supabase.from).toHaveBeenCalledWith('couples')
    })

    it('should throw error when creation fails', async () => {
      ;(supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' }
            })
          })
        })
      })

      await expect(createCouple('Test Couple', 'João', 'ABC123')).rejects.toThrow(
        'Erro ao criar casal: Database error'
      )
    })
  })

  describe('validateCode', () => {
    it('should return couple when code is valid', async () => {
      const mockCouple = {
        id: '123',
        coupleName: 'Test Couple',
        user1: 'João',
        user2: null,
        validated: false,
        code: 'ABC123',
        createdAt: new Date().toISOString()
      }

      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockCouple, error: null })
          })
        })
      })

      const result = await validateCode('ABC123')

      expect(result).toEqual(mockCouple)
    })

    it('should return null when code not found', async () => {
      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'Not found' } })
          })
        })
      })

      const result = await validateCode('INVALID')

      expect(result).toBeNull()
    })

    it('should throw error when validation fails', async () => {
      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: null, error: { message: 'Database error' } })
          })
        })
      })

      await expect(validateCode('ABC123')).rejects.toThrow('Erro ao validar código: Database error')
    })
  })

  describe('updateCoupleUser2', () => {
    it('should update couple with user2 successfully', async () => {
      const mockCouple = {
        id: '123',
        coupleName: 'Test Couple',
        user1: 'João',
        user2: 'Maria',
        validated: true,
        code: 'ABC123',
        createdAt: new Date().toISOString()
      }

      ;(supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: mockCouple, error: null })
            })
          })
        })
      })

      const result = await updateCoupleUser2('123', 'Maria')

      expect(result).toEqual(mockCouple)
    })

    it('should throw error when update fails', async () => {
      ;(supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest
                .fn()
                .mockResolvedValue({ data: null, error: { message: 'Database error' } })
            })
          })
        })
      })

      await expect(updateCoupleUser2('123', 'Maria')).rejects.toThrow(
        'Erro ao atualizar casal: Database error'
      )
    })
  })
})
