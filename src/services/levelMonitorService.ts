import type { LevelMonitorConfig } from '../config/apiConfig'
import type { WebClientType } from './webClient'
import type { MqttClient } from '../mqtt'
import type { ClientIdentifier } from '../typing/mqtt'
import type { SensorValue } from '../typing/levelMonitor'

export class LevelMonitorService {
  private readonly config: LevelMonitorConfig
  private readonly webClient: WebClientType
  private readonly mqtt: MqttClient

  constructor(config: LevelMonitorConfig, webClient: WebClientType, mqtt: MqttClient) {
    this.config = config
    this.webClient = webClient
    this.mqtt = mqtt
  }

  handle(clientIdentifier: ClientIdentifier, sensorValue: SensorValue): Promise<{ status: boolean }> {
    return this.webClient.put<{ status: boolean }>({
      baseUrl: this.config.baseUrl,
      path: this.config.sensorValue,
      headers: { authorization: clientIdentifier.clientId },
      uriVariables: { widgetId: clientIdentifier.widget.widgetId },
      body: sensorValue
    })
  }
}
