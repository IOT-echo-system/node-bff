import type { Request } from 'express'
import type { ClientId, ClientIdentifier, MqttPacket } from '../typing/mqtt'
import type { WebClientType } from './webClient'
import type { BoardConfig } from '../config/apiConfig'
import type { MqttClient } from '../mqtt'
import type { BoardData } from '../typing/board'

export class BoardService {
  private readonly config: BoardConfig
  private readonly webClient: WebClientType
  private readonly mqtt: MqttClient

  constructor(boardConfig: BoardConfig, webClient: WebClientType, mqtt: MqttClient) {
    this.config = boardConfig
    this.webClient = webClient
    this.mqtt = mqtt
  }

  restart(request: Request): Promise<MqttPacket> {
    const client: ClientIdentifier = request.app.locals.client as ClientIdentifier
    const clientId: ClientId = { clientId: client.clientId, boardId: client.boardId }
    return this.mqtt.publishToBoard(clientId, 'RESTART')
  }

  setupMode(request: Request): Promise<MqttPacket> {
    const client: ClientIdentifier = request.app.locals.client as ClientIdentifier
    const clientId: ClientId = { clientId: client.clientId, boardId: client.boardId }
    return this.mqtt.publishToBoard(clientId, 'SETUP')
  }

  handleHeartBeat(payload: ClientIdentifier): Promise<void> {
    return this.webClient.put({
      baseUrl: this.config.baseUrl,
      path: this.config.heartBeat,
      headers: { authorization: payload.clientId }
    })
  }

  handle(mqttTopicData: BoardData): Promise<void> {
    return this.handleHeartBeat(mqttTopicData)
  }
}
