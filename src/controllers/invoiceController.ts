import type { InvoiceService } from '../services'
import type { Request } from 'express'
import type { ClientIdentifier, MqttPacket } from '../typing/mqtt'
import type { InvoiceState } from '../typing/invoice'

export class InvoiceController {
  private readonly invoiceService: InvoiceService

  constructor(invoiceService: InvoiceService) {
    this.invoiceService = invoiceService
    this.updateState = this.updateState.bind(this)
  }

  updateState(request: Request): Promise<MqttPacket> {
    return this.invoiceService.updateState(request.app.locals.client as ClientIdentifier, request.body as InvoiceState)
  }
}
