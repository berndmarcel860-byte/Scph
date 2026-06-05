import type { SessionState, TrainingState, TrainingStep } from '../../../shared/types/session'
import { canTransition } from '../state/stateMachine'
import { getSession, resetSession, saveSession } from '../state/sessionStore'

export const getSessionState = (sessionId?: string): SessionState => {
  return getSession(sessionId)
}

export const setStep = (step: TrainingStep, sessionId?: string): SessionState => {
  const session = getSession(sessionId)
  const previousState: TrainingState = session.currentStep

  if (!canTransition(previousState, step)) {
    throw new Error(`Invalid transition from ${previousState} to ${step}`)
  }

  return saveSession({
    ...session,
    currentStep: step,
    updatedAt: Date.now(),
  })
}

export const adminOverrideStep = (step: TrainingStep, sessionId?: string): SessionState => {
  const session = getSession(sessionId)

  return saveSession({
    ...session,
    currentStep: step,
    updatedAt: Date.now(),
  })
}

export const resetTrainingSession = (sessionId?: string): SessionState => {
  return resetSession(sessionId)
}
