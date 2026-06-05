import { createContext } from 'react'
import type { SessionState } from '../../../shared/types/session'

export interface SessionContextValue {
  session: SessionState | null
}

export const SessionContext = createContext<SessionContextValue>({ session: null })
