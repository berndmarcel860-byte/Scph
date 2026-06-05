import type { TrainingStep } from '../../../../shared/types/session'

const stepActions: Array<{ label: string; step: TrainingStep }> = [
  { label: 'Go to Login', step: 'LOGIN_STEP' },
  { label: 'Go to MFA', step: 'MFA_STEP' },
  { label: 'Go to Email', step: 'EMAIL_STEP' },
  { label: 'Go to Success', step: 'SUCCESS_STEP' },
]

interface StepControllerProps {
  onSetStep: (step: TrainingStep) => void
  onReset: () => void
}

export const StepController = ({ onSetStep, onReset }: StepControllerProps) => {
  return (
    <div className="admin-controls">
      {stepActions.map((action) => (
        <button key={action.step} onClick={() => onSetStep(action.step)} type="button">
          {action.label}
        </button>
      ))}
      <button onClick={onReset} type="button" className="secondary">
        Reset Session
      </button>
    </div>
  )
}
