import type { CollectionOfButtonsConfig } from '../config/apiConfig'
import type { WebClientType } from './webClient'
import type { MqttClient } from '../mqtt'
import type { ClientIdentifier, MqttPacket } from '../typing/mqtt'
import type { ButtonState, CollectionOfButtonsData } from '../typing/collectionOfButtons'

export class CollectionOfButtonsService {
  private readonly config: CollectionOfButtonsConfig
  private readonly webClient: WebClientType
  private readonly mqtt: MqttClient

  constructor(config: CollectionOfButtonsConfig, webClient: WebClientType, mqtt: MqttClient) {
    this.config = config
    this.webClient = webClient
    this.mqtt = mqtt
  }

  handle(collectionOfButtonsData: CollectionOfButtonsData): Promise<{ status: boolean }> {
    return this.webClient.put<{ status: boolean }>({
      baseUrl: this.config.baseUrl,
      path: this.config.sensorValue,
      headers: { authorization: collectionOfButtonsData.clientId },
      uriVariables: {
        widgetId: collectionOfButtonsData.widget.widgetId,
        buttonId: collectionOfButtonsData.data.buttonId
      },
      body: { value: collectionOfButtonsData.data.value }
    })
  }

  updateButtonState(client: ClientIdentifier, buttonState: ButtonState): Promise<MqttPacket> {
    return this.mqtt.publish(client, 'STATE', buttonState)
  }
}
