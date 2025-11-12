interface SupabaseClientMock {
  from: (table: string) => {
    select: (
      columns: string
    ) => Promise<{ data: unknown; error: { message: string } | null }>
  }
}

const createSupabaseClientMock = (rows: unknown): SupabaseClientMock => {
  return {
    from: () => ({
      select: async (): Promise<{
        data: unknown
        error: { message: string } | null
      }> => ({ data: rows, error: null })
    })
  }
}

const createErrorSupabaseClientMock = (message: string): SupabaseClientMock => {
  return {
    from: () => ({
      select: async (
        _columns: string
      ): Promise<{ data: unknown; error: { message: string } | null }> => {
        void _columns
        return { data: null, error: { message } }
      }
    })
  }
}

const createThrowingSupabaseClientMock = (): SupabaseClientMock => {
  return {
    from: () => ({
      select: async (
        _columns: string
      ): Promise<{ data: unknown; error: { message: string } | null }> => {
        void _columns
        throw 'boom'
      }
    })
  }
}

export {
  SupabaseClientMock,
  createSupabaseClientMock,
  createErrorSupabaseClientMock,
  createThrowingSupabaseClientMock
}
