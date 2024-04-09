import type { Request, Response } from 'express'
import express from 'express'
import router from './router'
import { attachClient, attachTraceId, logRequestAndResponse } from './middleware/logger'
import { HttpStatus } from './config/http'

const app = express()
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'Hello human, you have just arrived at node-bff-server' })
})

app.use(attachTraceId)
app.use(logRequestAndResponse)
app.use(attachClient)
app.use('/api', router)

app.use((_req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).send({ message: 'Method not found!' })
})

export default app
