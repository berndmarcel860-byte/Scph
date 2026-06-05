import { useContext } from 'react'
import { SessionContext } from './SessionContextStore'

export const useSession = () => useContext(SessionContext)
