interface Couple {
  id: string
  coupleName: string
  user1: string
  user2: string | null
  validated: boolean
  code: string
  createdAt: string
}

export type { Couple }
