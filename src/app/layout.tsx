import { AuthProvider } from '@/contexts/AuthContext'
import '../styles/globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}


