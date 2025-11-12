import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite'

const getDatabase = (): SQLiteDatabase => {
  return openDatabaseSync('love-duo.db')
}

class DatabaseError extends Error {
  operation: string
  originalError: Error
  constructor(message: string, operation: string, originalError: Error) {
    super(message)
    this.name = 'DatabaseError'
    this.operation = operation
    this.originalError = originalError
  }
}

const ensureTables = async (db: SQLiteDatabase): Promise<void> => {
  try {
    await db.withTransactionAsync(async () => {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, key TEXT NOT NULL, value TEXT)'
      )
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    throw new DatabaseError('Failed to create tables', 'ensureTables', err)
  }
}

const insertSetting = async (
  db: SQLiteDatabase,
  key: string,
  value: string
): Promise<void> => {
  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync('INSERT INTO settings (key, value) VALUES (?, ?)', [
        key,
        value
      ])
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    throw new DatabaseError('Failed to insert setting', 'insertSetting', err)
  }
}

const querySettingValue = async (
  db: SQLiteDatabase,
  key: string
): Promise<string | null> => {
  try {
    const row = await db.getFirstAsync<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [key]
    )
    return row?.value ?? null
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    throw new DatabaseError('Failed to query setting', 'querySettingValue', err)
  }
}

export { getDatabase, ensureTables, insertSetting, querySettingValue }
