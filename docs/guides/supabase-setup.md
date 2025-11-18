# Supabase Setup Guide

This guide explains how to set up Supabase for the Love Duo application.

## Overview

The application uses Supabase as the backend database to store and validate couple information. This enables two users to connect by sharing a unique code.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Expo CLI installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: love-duo (or any name you prefer)
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Select the region closest to your users
4. Click "Create new project"
5. Wait for the project to finish setting up

## Step 2: Create the Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupleName TEXT NOT NULL,
  user1 TEXT NOT NULL,
  user2 TEXT,
  validated BOOLEAN DEFAULT FALSE,
  code TEXT UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Create index on code for faster lookups
CREATE INDEX idx_couples_code ON couples(code);

-- Create index on validated for filtering
CREATE INDEX idx_couples_validated ON couples(validated);
```

4. Click "Run" to execute the query
5. Verify the table was created by going to **Table Editor** and checking for the `couples` table

## Step 3: Configure Row Level Security (RLS)

For security, enable Row Level Security:

1. In the SQL Editor, run:

```sql
-- Enable RLS
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (create couple)
CREATE POLICY "Allow insert for all users" ON couples
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to select by code (validate code)
CREATE POLICY "Allow select by code for all users" ON couples
  FOR SELECT
  USING (true);

-- Allow anyone to update user2 and validated fields
CREATE POLICY "Allow update user2 and validated for all users" ON couples
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

> **Note**: These policies are permissive for MVP. In production, you should implement proper authentication and restrict access based on user identity.

## Step 4: Get API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 5: Configure Environment Variables

1. In the root of your project, create a `.env` file (if it doesn't exist)
2. Add the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-url` and `your-anon-key` with the values from Step 4.

3. Make sure `.env` is in your `.gitignore` file to avoid committing secrets

## Step 6: Install Dependencies

The Supabase client is already installed in the project. If you need to reinstall it:

```bash
npm install @supabase/supabase-js
```

## Step 7: Verify Setup

1. Start your development server:

```bash
npm start
```

2. Run the app on your device or simulator
3. Try creating a new couple:
   - Click "Criar Novo Casal"
   - Enter a couple name and your name
   - Click "Criar Código"
   - You should see a 6-character code
4. Verify in Supabase:
   - Go to **Table Editor** → `couples`
   - You should see the newly created record

## Database Schema Reference

### `couples` Table

| Column     | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| id         | UUID      | Primary key (auto-generated)                   |
| coupleName | TEXT      | Name of the couple (e.g., "João & Maria")      |
| user1      | TEXT      | Name of the first user who created the couple  |
| user2      | TEXT      | Name of the second user (null until validated) |
| validated  | BOOLEAN   | Whether the code has been used by user2        |
| code       | TEXT      | Unique 6-character code for sharing            |
| createdAt  | TIMESTAMP | When the couple was created                    |

### Indexes

- `idx_couples_code`: Speeds up code lookups
- `idx_couples_validated`: Speeds up filtering by validation status

## Application Flow

### Flow 1: Create Couple (User 1)

1. User 1 enters couple name and their name
2. App generates a unique 6-character code
3. App calls `createCouple(coupleName, user1, code)`
4. Record is saved to Supabase with `validated: false`
5. Code is displayed to share with User 2

### Flow 2: Validate Code (User 2)

1. User 2 enters the code and their name
2. App calls `validateCode(code)` to check if code exists
3. If code is valid and not yet validated:
   - App calls `updateCoupleUser2(coupleId, user2)`
   - Record is updated with User 2's name
   - `validated` field is set to `true`
4. Both users can now access the app

## Service Functions

The application uses three main service functions in `src/services/couple.service.ts`:

### `createCouple(coupleName: string, user1: string, code: string)`

Creates a new couple record in the database.

**Parameters:**

- `coupleName`: The name of the couple
- `user1`: The name of the first user
- `code`: The unique 6-character code

**Returns:** `Promise<Couple>`

### `validateCode(code: string)`

Retrieves a couple record by code.

**Parameters:**

- `code`: The 6-character code to validate

**Returns:** `Promise<Couple | null>`

- Returns the couple record if found
- Returns `null` if code doesn't exist

### `updateCoupleUser2(coupleId: string, user2: string)`

Updates a couple record with the second user and marks it as validated.

**Parameters:**

- `coupleId`: The UUID of the couple record
- `user2`: The name of the second user

**Returns:** `Promise<Couple>`

## Troubleshooting

### Error: "Invalid API key"

- Verify that `EXPO_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check that the key is the "anon public" key, not the service role key
- Make sure there are no extra spaces in the `.env` file

### Error: "Failed to fetch"

- Verify that `EXPO_PUBLIC_SUPABASE_URL` is correct
- Check your internet connection
- Ensure the Supabase project is active (not paused)

### Error: "Row level security policy violation"

- Verify that RLS policies are correctly set up (see Step 3)
- Check that RLS is enabled on the `couples` table

### Code not found

- Verify the code was correctly saved in the database
- Check that the code is exactly 6 characters (case-sensitive)
- Look at the `couples` table in Supabase Table Editor

### Development Tips

- Use Supabase Table Editor to view and debug data
- Check the "Logs" section in Supabase for API errors
- Use the browser console to see client-side errors

## Security Considerations

For production deployment:

1. **Implement Authentication**: Use Supabase Auth to authenticate users
2. **Restrict RLS Policies**: Update policies to only allow users to access their own data
3. **Add Validation**: Implement server-side validation using database functions
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Monitor Usage**: Set up alerts for unusual activity

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
