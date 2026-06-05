import http from 'http'
import cors from 'cors'
import express from 'express'
import adminRouter from './routes/adminRoutes'
import { createSocketServer } from './websocket/socketServer'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())
app.use('/api/admin', adminRouter)
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const server = http.createServer(app)
createSocketServer(server)

server.listen(port, () => {
  console.log(`Training server listening on port ${port}`)
})
