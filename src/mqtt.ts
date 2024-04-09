import logger from 'logging-starter'
import type { MqttClient as MqttClientType } from 'mqtt'
import mqttClient from 'mqtt'
import { config } from './config/config'
import { topics } from './topics'
import type { ClientId, ClientIdentifier, MqttPacket } from './typing/mqtt'
import { handleMqttMessage } from './handler/mqttHandler'

const createTopic = (clientIdentifier: ClientIdentifier, topic: string): string => {
  const topicName = topic ? `/${topic}` : ''
  const widget = clientIdentifier.widget
  return `clientId/${clientIdentifier.clientId}/${widget.name}/${widget.widgetId}${topicName}`
}

export class MqttClient {
  private static readonly client: MqttClient = new MqttClient()
  private readonly mqttClient: MqttClientType

  private constructor() {
    this.mqttClient = mqttClient.connect(config.mqttUrl, {
      clientId: `node-bff_${config.environment}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000
    })
    this.init()
  }

  init(): void {
    this.mqttClient.on('connect', () => {
      logger.info({ message: 'Successfully connected with mqtt' })

      const allTopics = topics.map(topic => `clientId/+/${topic}`)

      this.mqttClient.subscribe(allTopics, { qos: 1 }, error => {
        if (error) {
          logger.error({ errorMessage: 'Failed to subscribe topics', data: { allTopics } })
          return
        }
        logger.info({ message: 'Successfully subscribed topics', data: { allTopics } })
        this.mqttClient.on('message', handleMqttMessage)
      })
    })

    this.mqttClient.on('disconnect', () => {
      logger.error({ errorMessage: 'Disconnected with mqtt' })
    })
  }

  publish(
    clientIdentifier: ClientIdentifier,
    topic: string,
    message: Record<string, unknown> = {}
  ): Promise<MqttPacket> {
    const topicName = createTopic(clientIdentifier, topic)
    return this.mqttClient
      .publishAsync(topicName, JSON.stringify(message), { qos: 1 })
      .logOnSuccess({ message: 'Successfully published topic', data: { topicName, message } })
      .logOnError({ errorMessage: 'Successfully published topic', data: { topicName, message } })
  }

  static getInstance(): MqttClient {
    return this.client
  }

  publishToBoard(clientId: ClientId, topic: string, message: Record<string, unknown> = {}): Promise<MqttPacket> {
    const topicName = `clientId/${clientId.clientId}${topic ? `/${topic}` : ''}`
    return this.mqttClient
      .publishAsync(topicName, JSON.stringify(message), { qos: 1 })
      .logOnSuccess({ message: 'Successfully published topic', data: { topicName, message } })
      .logOnError({ errorMessage: 'Successfully published topic', data: { topicName, message } })
  }
}
