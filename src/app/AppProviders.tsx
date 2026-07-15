import type { ReactNode } from 'react'
import { FavoritesProvider } from '../features/favorites/FavoritesContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
