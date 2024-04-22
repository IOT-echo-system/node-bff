import type { CollectionOfButtonsService } from '../services'
import type { Request } from 'express'
import type { ClientIdentifier, MqttPacket } from '../typing/mqtt'
import type { ButtonState } from '../typing/collectionOfButtons'

export class CollectionOfButtonsController {
  private readonly collectionOfButtonsService: CollectionOfButtonsService

  constructor(collectionOfButtonsService: CollectionOfButtonsService) {
    this.collectionOfButtonsService = collectionOfButtonsService
    this.updateButtonState = this.updateButtonState.bind(this)
  }

  updateButtonState(request: Request): Promise<MqttPacket> {
    return this.collectionOfButtonsService.updateButtonState(
      request.app.locals.client as ClientIdentifier,
      request.body as ButtonState
    )
  }
}
