import logger from 'logging-starter'
import type { InvoiceConfig } from '../config/apiConfig'
import type { InvoiceData, InvoiceState } from '../typing/invoice'
import type { WebClientType } from './webClient'
import type { MqttClient } from '../mqtt'
import type { ClientIdentifier, MqttPacket } from '../typing/mqtt'

export class InvoiceService {
  private readonly config: InvoiceConfig
  private readonly webClient: WebClientType
  private readonly mqtt: MqttClient

  constructor(config: InvoiceConfig, webClient: WebClientType, mqtt: MqttClient) {
    this.config = config
    this.webClient = webClient
    this.mqtt = mqtt
  }

  handle(invoiceData: InvoiceData): Promise<MqttPacket> {
    switch (invoiceData.data.action) {
      case 'RESET': {
        return this.reset(invoiceData)
      }
      case 'ADD': {
        return this.addItem(invoiceData)
      }
      case 'REMOVE': {
        return this.removeItem(invoiceData)
      }
      case 'STATE': {
        return this.getState(invoiceData)
      }
      default:
        logger.error({ errorMessage: 'invalid action for invoice widget' })
        return Promise.reject('Unknown topic')
    }
  }

  private async reset(invoiceData: InvoiceData<'RESET'>): Promise<MqttPacket> {
    const invoiceState = await this.webClient.put<InvoiceState>({
      baseUrl: this.config.baseUrl,
      path: this.config.reset,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
    return this.updateState(invoiceData, invoiceState)
  }

  private async addItem(invoiceData: InvoiceData<'ADD'>): Promise<MqttPacket> {
    const invoiceState = await this.webClient.post<InvoiceState>({
      baseUrl: this.config.baseUrl,
      path: this.config.items,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId, code: invoiceData.data.code }
    })
    return this.updateState(invoiceData, invoiceState)
  }

  private async removeItem(invoiceData: InvoiceData<'REMOVE'>): Promise<MqttPacket> {
    const invoiceState = await this.webClient.deleteAPI<InvoiceState>({
      baseUrl: this.config.baseUrl,
      path: this.config.items,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId, code: invoiceData.data.code }
    })
    return this.updateState(invoiceData, invoiceState)
  }

  updateState(clientIdentifier: ClientIdentifier, invoiceState: InvoiceState): Promise<MqttPacket> {
    return this.mqtt.publish(clientIdentifier, 'STATE', invoiceState)
  }

  private async getState(invoiceData: InvoiceData<'STATE'>): Promise<MqttPacket> {
    const state = await this.webClient.get<InvoiceState>({
      baseUrl: this.config.baseUrl,
      path: this.config.state,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
    return this.updateState(invoiceData, state)
  }
}
