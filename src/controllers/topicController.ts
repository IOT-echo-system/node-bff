import type { MqttClient } from 'mqtt'
import type { InvoicePayload } from '../typing/invoice'
import logger from 'logging-starter'

export const topicController = (payload: InvoicePayload, mqttClient: MqttClient): void => {
  logger.info({ message: '', data: { payload, mqttClient } })
}
