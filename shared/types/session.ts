export const TRAINING_STEPS = [
  'LOGIN_STEP',
  'MFA_STEP',
  'EMAIL_STEP',
  'SUCCESS_STEP',
] as const

export type TrainingStep = (typeof TRAINING_STEPS)[number]

export type TrainingState = 'INIT' | TrainingStep

export interface SessionState {
  sessionId: string
  currentStep: TrainingStep
  updatedAt: number
}
