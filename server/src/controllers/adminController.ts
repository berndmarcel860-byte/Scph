import type { Request, Response } from 'express'
import { adminOverrideStep, getSessionState, resetTrainingSession } from '../services/sessionService'
import { isValidStep } from '../state/stateMachine'

export const getSessionController = (req: Request, res: Response): void => {
  const sessionId = req.query.sessionId as string | undefined
  res.json(getSessionState(sessionId))
}

export const setStepController = (req: Request, res: Response): void => {
  const sessionId = req.body.sessionId as string | undefined
  const step = req.body.step

  if (typeof step !== 'string' || !isValidStep(step)) {
    res.status(400).json({ error: 'Invalid step provided' })
    return
  }

  res.json(adminOverrideStep(step, sessionId))
}

export const resetSessionController = (req: Request, res: Response): void => {
  const sessionId = req.body.sessionId as string | undefined
  res.json(resetTrainingSession(sessionId))
}
