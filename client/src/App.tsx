import type { ReactElement } from 'react'
import type { TrainingStep } from '../../shared/types/session'
import { AdminPanel } from './components/admin/AdminPanel'
import { EmailStep } from './components/auth/EmailStep'
import { LoginStep } from './components/auth/LoginStep'
import { MFAStep } from './components/auth/MFAStep'
import { SuccessStep } from './components/auth/SuccessStep'
import { Header } from './components/shared/Header'
import { TrainingBanner } from './components/shared/TrainingBanner'
import { useSession } from './context/useSession'
import './index.css'

const stepMap: Record<TrainingStep, ReactElement> = {
  LOGIN_STEP: <LoginStep />,
  MFA_STEP: <MFAStep />,
  EMAIL_STEP: <EmailStep />,
  SUCCESS_STEP: <SuccessStep />,
}

function App() {
  const { session } = useSession()

  const content = session ? stepMap[session.currentStep] : <LoginStep />

  return (
    <div className="layout">
      <Header />
      <TrainingBanner />
      <main className="content-grid">
        <section key={session?.currentStep ?? 'LOGIN_STEP'} className="panel step-transition">
          {content}
        </section>
        <AdminPanel />
      </main>
    </div>
  )
}

export default App
