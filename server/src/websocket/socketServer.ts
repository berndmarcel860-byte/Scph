import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServerEvents, ServerToClientEvents } from '../../../shared/types/events'
import { adminOverrideStep, getSessionState, resetTrainingSession } from '../services/sessionService'
import { isValidStep } from '../state/stateMachine'

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    socket.on('JOIN_SESSION', (payload) => {
      socket.emit('SESSION_STATE', getSessionState(payload?.sessionId))
    })

    socket.on('ADMIN_SET_STEP', (payload) => {
      if (!isValidStep(payload.step)) {
        return
      }

      const updated = adminOverrideStep(payload.step, payload.sessionId)
      io.emit('STEP_CHANGED', updated)
    })

    socket.on('RESET_SESSION', (payload) => {
      const reset = resetTrainingSession(payload?.sessionId)
      io.emit('SESSION_RESET', reset)
      io.emit('SESSION_STATE', reset)
    })
  })

  return io
}
