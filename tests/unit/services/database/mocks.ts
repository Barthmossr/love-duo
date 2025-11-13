import type { SQLiteDatabase } from 'expo-sqlite'

interface MockTransactionContext {
  executedSql: string[]
  settings: Record<string, string>
}

const createMockDb = (ctx: MockTransactionContext): SQLiteDatabase => {
  const db = {
    execAsync: async (sql: string): Promise<void> => {
      ctx.executedSql.push(sql)
    },
    runAsync: async (
      sql: string,
      params: [string, string]
    ): Promise<{ changes: number }> => {
      ctx.executedSql.push(sql)
      if (sql.startsWith('INSERT INTO settings')) {
        const [key, value] = params
        ctx.settings[key] = value
        return { changes: 1 }
      }
      return { changes: 0 }
    },
    getFirstAsync: async <T>(
      sql: string,
      params: [string]
    ): Promise<T | null> => {
      ctx.executedSql.push(sql)
      if (sql.startsWith('SELECT value FROM settings')) {
        const [key] = params
        const value = ctx.settings[key]
        if (typeof value === 'string') {
          return { value } as unknown as T
        }
        return null
      }
      return null
    },
    withTransactionAsync: async (task: () => Promise<void>): Promise<void> => {
      await task()
    }
  } as unknown as SQLiteDatabase

  return db
}

export { MockTransactionContext, createMockDb }
