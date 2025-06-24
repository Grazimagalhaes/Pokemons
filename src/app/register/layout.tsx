
import { ProtectedRoute } from '@/components/ProtectedRouter'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
      
    
  )
}


