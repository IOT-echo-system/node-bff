import type { MqttClient } from 'mqtt'
import type { DigitalPayload } from '../typing/digital'
import logger from 'logging-starter'

export const digitalController = (payload: DigitalPayload, mqttClient: MqttClient): void => {
  logger.info({ message: '', data: { payload, mqttClient } })
}
