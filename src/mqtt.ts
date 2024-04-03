import logger from 'logging-starter'
import mqtt from 'mqtt'
import { config } from './config/config'
import { topics } from './topics'
import handler from './handler'

const main = (): void => {
  const mqttClient = mqtt.connect(config.mqttUrl, {
    clientId: 'node-bff',
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
  })

  mqttClient.on('connect', () => {
    logger.info({ message: 'Successfully connected with mqtt' })

    mqttClient.subscribe(topics as unknown as string[], { qos: 1 }, error => {
      if (error) {
        logger.error({ errorMessage: 'Failed to subscribe topics', data: { topics } })
        return
      }
      logger.info({ message: 'Successfully subscribed topics', data: { topics } })

      mqttClient.on('message', handler(mqttClient))
    })
  })

  mqttClient.on('disconnect', () => {
    logger.error({ errorMessage: 'Disconnected with mqtt' })
  })
}

export default main
