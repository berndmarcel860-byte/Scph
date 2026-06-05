import type { SessionState } from '../../../shared/types/session'

const DEFAULT_SESSION_ID = 'training-session'

const createDefaultSession = (sessionId = DEFAULT_SESSION_ID): SessionState => ({
  sessionId,
  currentStep: 'LOGIN_STEP',
  updatedAt: Date.now(),
})

const sessions = new Map<string, SessionState>([[DEFAULT_SESSION_ID, createDefaultSession()]])

export const getSession = (sessionId = DEFAULT_SESSION_ID): SessionState => {
  const existing = sessions.get(sessionId)
  if (existing) {
    return existing
  }

  const freshSession = createDefaultSession(sessionId)
  sessions.set(sessionId, freshSession)
  return freshSession
}

export const saveSession = (session: SessionState): SessionState => {
  sessions.set(session.sessionId, session)
  return session
}

export const resetSession = (sessionId = DEFAULT_SESSION_ID): SessionState => {
  const reset = createDefaultSession(sessionId)
  sessions.set(sessionId, reset)
  return reset
}
