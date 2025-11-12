import type { SQLiteDatabase } from 'expo-sqlite'
import { z } from 'zod'

import type { SettingRow, SupabaseClientLike } from './sync.types'

class SyncError extends Error {
  operation: string
  originalError: Error
  constructor(message: string, operation: string, originalError: Error) {
    super(message)
    this.name = 'SyncError'
    this.operation = operation
    this.originalError = originalError
  }
}

const settingsSchema = z.array(z.object({ key: z.string(), value: z.string() }))

const syncSettingsFromSupabase = async (
  db: SQLiteDatabase,
  client: SupabaseClientLike
): Promise<void> => {
  try {
    const res = await client.from('settings').select('key,value')
    if (res.error !== null) {
      throw new Error(res.error.message)
    }
    const rows = settingsSchema.parse(res.data ?? []) as SettingRow[]
    await db.withTransactionAsync(async () => {
      await Promise.all(
        rows.map(row =>
          db.runAsync('INSERT INTO settings (key, value) VALUES (?, ?)', [
            row.key,
            row.value
          ])
        )
      )
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    throw new SyncError(
      'Failed to sync settings',
      'syncSettingsFromSupabase',
      err
    )
  }
}

export { syncSettingsFromSupabase }
