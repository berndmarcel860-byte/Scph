import type { TrainingState, TrainingStep } from '../../../shared/types/session'

const TRAINING_STEPS: TrainingStep[] = ['LOGIN_STEP', 'MFA_STEP', 'EMAIL_STEP', 'SUCCESS_STEP']
const STEP_ORDER: TrainingState[] = ['INIT', ...TRAINING_STEPS]

export const isValidStep = (step: string): step is TrainingStep => {
  return TRAINING_STEPS.includes(step as TrainingStep)
}

export const canTransition = (from: TrainingState, to: TrainingStep): boolean => {
  if (from === to) {
    return true
  }

  const fromIndex = STEP_ORDER.indexOf(from)
  const toIndex = STEP_ORDER.indexOf(to)

  return toIndex - fromIndex === 1
}
