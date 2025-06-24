'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext' 

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('user')){
      console.log(' Usuário não autenticado. Redirecionando para /login...')
      router.push('/login')
    } else {
      console.log(' Usuário autenticado:', user)
    }
  }, [user, router,isLoaded])

  //if (!user) return null

  return <>{children}</>
}