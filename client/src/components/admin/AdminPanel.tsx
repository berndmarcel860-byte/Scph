import type { TrainingStep } from '../../../../shared/types/session'
import { useSession } from '../../context/useSession'
import { useSocket } from '../../hooks/useSocket'
import { StepController } from './StepController'

export const AdminPanel = () => {
  const { session } = useSession()
  const { emit } = useSocket()

  const setStep = (step: TrainingStep) => {
    emit('ADMIN_SET_STEP', { step, sessionId: session?.sessionId })
  }

  const resetSession = () => {
    emit('RESET_SESSION', { sessionId: session?.sessionId })
  }

  return (
    <aside className="panel">
      <h3>Admin Dashboard</h3>
      <p>
        Current step: <strong>{session?.currentStep ?? 'Loading...'}</strong>
      </p>
      <p>Last update: {session ? new Date(session.updatedAt).toLocaleTimeString() : '...'}</p>
      <StepController onSetStep={setStep} onReset={resetSession} />
    </aside>
  )
}
