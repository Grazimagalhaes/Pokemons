'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextProps {
  user: User | null
  isLoaded: boolean 
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setisLoaded] = useState (false)
  const router = useRouter()

  useEffect(() => {
    setisLoaded (false)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } 
    setisLoaded (true)
  }, [])
  

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('https://6852ca200594059b23cf16ed.mockapi.io/pokemonsms/users')
      const data = await res.json()

      const foundUser = data.find(
        (u: any) => u.email === email && u.password === password
      )

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser))
        setUser(foundUser)
        router.push('/dashboard')
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error('Erro no login:', err)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
 



