import logger from 'logging-starter'
import app from './src/app'

const port = Number(process.env.PORT ?? '3002')

app.listen(port, () => {
  logger.info({ message: `cloud bff is started on port ${port}` })
})

