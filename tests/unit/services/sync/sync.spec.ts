import type { SQLiteDatabase } from 'expo-sqlite'

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: (): unknown => ({})
}))

import {
  createErrorSupabaseClientMock,
  createSupabaseClientMock,
  createThrowingSupabaseClientMock,
  SupabaseClientMock
} from './mocks'
import { createMockDb } from '../database/mocks'

import { querySettingValue, syncSettingsFromSupabase } from '@/services'

describe('sync settings from supabase', () => {
  it('should insert rows into sqlite', async () => {
    const db = createMockDb({
      executedSql: [],
      settings: {}
    }) as unknown as SQLiteDatabase
    const client = createSupabaseClientMock([
      { key: 'theme', value: 'dark' },
      { key: 'language', value: 'en' }
    ])
    await syncSettingsFromSupabase(db, client)
    const theme = await querySettingValue(db, 'theme')
    const language = await querySettingValue(db, 'language')
    expect(theme).toBe('dark')
    expect(language).toBe('en')
  })
})
