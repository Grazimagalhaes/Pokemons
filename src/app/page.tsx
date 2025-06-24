'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const WorkspacePage = () => {

  const router = useRouter()

  useEffect(() => {
   
      router.push('/login')
    
    
  }, [ router])

  

  return null 
}

export default WorkspacePage
