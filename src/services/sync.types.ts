interface SettingRow {
  key: string
  value: string
}

interface SupabaseQueryResult<T> {
  data: T | null
  error: { message: string } | null
}

interface SupabaseClientLike {
  from: (table: string) => {
    select: (columns: string) => Promise<SupabaseQueryResult<unknown>>
  }
}

export { SettingRow, SupabaseQueryResult, SupabaseClientLike }
