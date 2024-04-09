import type { InvoiceService } from '../services'
import type { Request } from 'express'
import type { MqttPacket } from '../typing/mqtt'

export class InvoiceController {
  private readonly invoiceService: InvoiceService

  constructor(invoiceService: InvoiceService) {
    this.invoiceService = invoiceService
    this.updateState = this.updateState.bind(this)
  }

  updateState(request: Request): Promise<MqttPacket> {
    return this.invoiceService.updateState(request)
  }
}
