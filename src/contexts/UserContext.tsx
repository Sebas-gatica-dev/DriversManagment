'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface UserData {
  username: string
  email: string
  authorities: { authority: string }[]
  // Añade aquí otros campos que quieras utilizar
  joinDate?: string
  vacationsPlanned?: number
}

interface UserContextType {
  user: UserData | null
  setUser: (user: UserData | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}