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
})
