import type { MqttClient, MqttClientEventCallbacks } from 'mqtt'
import type { Topic } from './topics'
import logger from 'logging-starter'
import { digitalController, topicController } from './controllers'
import type { Payload, PayloadMetaData } from './typing/payload'

const handler = (mqttClient: MqttClient): MqttClientEventCallbacks['message'] => {
  return (topic, payload) => {
    try {
      const payloadData = JSON.parse(payload.toString()) as PayloadMetaData

      if (payloadData.meta.authorization.trim().length !== 36) {
        logger.error({ errorMessage: 'Invalid authorization token' })
        return
      }

      switch (topic as Topic) {
        case 'INVOICE': {
          topicController(payloadData as Payload['INVOICE'], mqttClient)
          return
        }
        case 'DIGITAL': {
          digitalController(payloadData as Payload['DIGITAL'], mqttClient)
          return
        }
        default:
          logger.error({ errorMessage: 'Invalid topic name' })
      }
    } catch (error: any) {
      logger.error({ errorMessage: 'Something went wrong!', error })
    }
  }
}

export default handler
