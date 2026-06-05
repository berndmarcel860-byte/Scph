import type { SessionState, TrainingStep } from './session'

export interface ClientToServerEvents {
  JOIN_SESSION: (payload: { sessionId?: string }) => void
  ADMIN_SET_STEP: (payload: { sessionId?: string; step: TrainingStep }) => void
  RESET_SESSION: (payload?: { sessionId?: string }) => void
}

export interface ServerToClientEvents {
  SESSION_STATE: (payload: SessionState) => void
  STEP_CHANGED: (payload: SessionState) => void
  SESSION_RESET: (payload: SessionState) => void
}
