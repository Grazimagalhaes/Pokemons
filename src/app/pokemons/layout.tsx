import { ProtectedRoute } from '@/components/ProtectedRouter';
import { ReactNode } from 'react';

export default function Pokemons({ children }: { children: ReactNode }) {
  return (
    
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      
    
  );
}
