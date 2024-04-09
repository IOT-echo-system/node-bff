import type { Request } from 'express'
import type { MqttPacket } from '../typing/mqtt'
import type { BoardService } from '../services'

export class BoardController {
  private readonly boardService: BoardService

  constructor(boardService: BoardService) {
    this.boardService = boardService
    this.setupMode = this.setupMode.bind(this)
    this.restart = this.restart.bind(this)
  }

  restart(request: Request): Promise<MqttPacket> {
    return this.boardService.restart(request)
  }

  setupMode(request: Request): Promise<MqttPacket> {
    return this.boardService.setupMode(request)
  }
}
