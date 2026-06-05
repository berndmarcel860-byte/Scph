import http from 'http'
import cors from 'cors'
import express from 'express'
import adminRouter from './routes/adminRoutes'
import { createSocketServer } from './websocket/socketServer'

const app = express()
const port = Number(process.env.PORT ?? 3001)
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())
app.use('/api/admin', adminRouter)
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const server = http.createServer(app)
createSocketServer(server, allowedOrigins)

server.listen(port, () => {
  console.log(`Training server listening on port ${port}`)
})
