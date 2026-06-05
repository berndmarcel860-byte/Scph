import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { SessionState } from '../../../shared/types/session'
import { useSocket } from '../hooks/useSocket'
import { SessionContext } from './sessionContext'

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionState | null>(null)
  const { emit, on } = useSocket()

  useEffect(() => {
    const offSessionState = on<SessionState>('SESSION_STATE', setSession)
    const offStepChanged = on<SessionState>('STEP_CHANGED', setSession)
    const offReset = on<SessionState>('SESSION_RESET', setSession)

    emit('JOIN_SESSION', {})

    return () => {
      offSessionState()
      offStepChanged()
      offReset()
    }
  }, [emit, on])

  const value = useMemo(() => ({ session }), [session])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
