import { useCallback, useEffect } from 'react'
import { socket } from '../services/socket'

type EventHandler<T = unknown> = (payload: T) => void

export const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
  }, [])

  const emit = useCallback((event: string, payload?: unknown) => {
    socket.emit(event, payload)
  }, [])

  const on = useCallback(<T,>(event: string, handler: EventHandler<T>) => {
    socket.on(event, handler)
    return () => socket.off(event, handler)
  }, [])

  const disconnect = useCallback(() => {
    socket.disconnect()
  }, [])

  return {
    emit,
    on,
    disconnect,
  }
}
