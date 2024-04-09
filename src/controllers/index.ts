import { BoardController } from './boardController'
import { BoardService, InvoiceService } from '../services'
import { apiConfig } from '../config/apiConfig'
import { InvoiceController } from './invoiceController'
import WebClient from '../services/webClient'
import { MqttClient } from '../mqtt'

const mqtt = MqttClient.getInstance()
export const boardService = new BoardService(apiConfig.board, WebClient, mqtt)
export const invoiceService = new InvoiceService(apiConfig.invoice, WebClient, mqtt)

export const boardController = new BoardController(boardService)
export const invoiceController = new InvoiceController(invoiceService)
