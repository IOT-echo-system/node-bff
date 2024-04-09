import logger from 'logging-starter'
import type { InvoiceConfig } from '../config/apiConfig'
import type { ActionMap, InvoiceData, InvoiceState } from '../typing/invoice'
import type { WebClientType } from './webClient'
import type { Request } from 'express'
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

  handle(invoiceData: InvoiceData): Promise<void> {
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
        return this.getState(invoiceData) as Promise<void>
      }
      default:
        logger.error({ errorMessage: 'invalid action for invoice widget' })
        return Promise.reject('Unknown topic')
    }
  }

  private reset(invoiceData: InvoiceData<'RESET'>): Promise<void> {
    return this.webClient.put({
      baseUrl: this.config.baseUrl,
      path: this.config.reset,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
  }

  private addItem(invoiceData: InvoiceData<'ADD'>): Promise<void> {
    return this.webClient.post({
      baseUrl: this.config.baseUrl,
      path: this.config.items,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
  }

  private removeItem(invoiceData: InvoiceData<'REMOVE'>): Promise<void> {
    return this.webClient.deleteAPI({
      baseUrl: this.config.baseUrl,
      path: this.config.items,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
  }

  updateState(request: Request): Promise<MqttPacket> {
    return this.mqtt.publish(
      request.app.locals.client as ClientIdentifier,
      'invoice/STATE',
      request.body as Record<string, unknown>
    )
  }

  private async getState(invoiceData: InvoiceData<'STATE'>): Promise<MqttPacket> {
    const state = await this.webClient.get<InvoiceState>({
      baseUrl: this.config.baseUrl,
      path: this.config.state,
      headers: { authorization: invoiceData.clientId },
      uriVariables: { invoiceId: invoiceData.widget.widgetId }
    })
    return this.mqtt.publish(invoiceData as ClientIdentifier, 'STATE', state)
  }
}
