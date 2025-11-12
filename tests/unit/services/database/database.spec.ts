import type { SQLiteDatabase } from 'expo-sqlite'

import { MockTransactionContext, createMockDb } from './helpers'

import {
  ensureTables,
  getDatabase,
  insertSetting,
  querySettingValue
} from '@/services'

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: (): unknown => ({})
}))

describe('database ensureTables', () => {
  it('should create settings table if not exists', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const db = createMockDb(ctx)
    await ensureTables(db)
    expect(ctx.executedSql[0]).toContain('CREATE TABLE IF NOT EXISTS settings')
  })

  it('should throw on table creation failure', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const failingDb = {
      execAsync: async (): Promise<void> => {
        throw new Error('boom')
      },
      withTransactionAsync: async (
        task: () => Promise<void>
      ): Promise<void> => {
        await task()
      }
    } as unknown as SQLiteDatabase

    await expect(ensureTables(failingDb)).rejects.toThrow(
      'Failed to create tables'
    )
    expect(ctx.executedSql.length).toBe(0)
  })

  it('should wrap non-Error exceptions in DatabaseError', async () => {
    const failingDb = {
      execAsync: async (): Promise<void> => {
        throw 'boom'
      },
      withTransactionAsync: async (
        task: () => Promise<void>
      ): Promise<void> => {
        await task()
      }
    } as unknown as SQLiteDatabase

    await expect(ensureTables(failingDb)).rejects.toThrow(
      'Failed to create tables'
    )
  })

  it('should open database using sync API', () => {
    const db = getDatabase()
    expect(typeof db).toBe('object')
  })

  it('should insert and query one setting row', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const db = createMockDb(ctx)
    await ensureTables(db)
    await insertSetting(db, 'theme', 'dark')
    const value = await querySettingValue(db, 'theme')
    expect(value).toBe('dark')
  })

  it('should return null for missing setting key', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const db = createMockDb(ctx)
    const value = await querySettingValue(db, 'missing')
    expect(value).toBeNull()
  })

  it('should return zero changes in runAsync fallback', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const db = createMockDb(ctx)
    const result = await (
      db as unknown as {
        runAsync: (
          sql: string,
          params: [string, string]
        ) => Promise<{ changes: number }>
      }
    ).runAsync('UPDATE settings SET value = ? WHERE key = ?', [
      'theme',
      'light'
    ])
    expect(result.changes).toBe(0)
  })

  it('should return null in getFirstAsync fallback', async () => {
    const ctx: MockTransactionContext = { executedSql: [], settings: {} }
    const db = createMockDb(ctx)
    const result = await (
      db as unknown as {
        getFirstAsync: <T>(sql: string, params: [string]) => Promise<T | null>
      }
    ).getFirstAsync<{ value: string }>(
      'SELECT value FROM other WHERE key = ?',
      ['x']
    )
    expect(result).toBeNull()
  })

  it('should throw on insert failure', async () => {
    const failingDb = {
      runAsync: async (): Promise<void> => {
        throw 'boom'
      },
      withTransactionAsync: async (
        task: () => Promise<void>
      ): Promise<void> => {
        await task()
      }
    } as unknown as SQLiteDatabase

    await expect(insertSetting(failingDb, 'theme', 'dark')).rejects.toThrow(
      'Failed to insert setting'
    )
  })

  it('should throw on insert failure with Error object', async () => {
    const failingDb = {
      runAsync: async (): Promise<void> => {
        throw new Error('boom')
      },
      withTransactionAsync: async (
        task: () => Promise<void>
      ): Promise<void> => {
        await task()
      }
    } as unknown as SQLiteDatabase

    await expect(insertSetting(failingDb, 'theme', 'dark')).rejects.toThrow(
      'Failed to insert setting'
    )
  })
})
