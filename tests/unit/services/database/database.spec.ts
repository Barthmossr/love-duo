import type { SQLiteDatabase } from 'expo-sqlite'

import { MockTransactionContext, createMockDb } from './mocks'

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
})
