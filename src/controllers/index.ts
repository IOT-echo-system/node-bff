import { BoardController } from './boardController'
import { BoardService, CollectionOfButtonsService, InvoiceService, LevelMonitorService } from '../services'
import { apiConfig } from '../config/apiConfig'
import { InvoiceController } from './invoiceController'
import WebClient from '../services/webClient'
import { MqttClient } from '../mqtt'
import { CollectionOfButtonsController } from './collectionOfButtonsController'

const mqtt = MqttClient.getInstance()
export const boardService = new BoardService(apiConfig.board, WebClient, mqtt)
export const invoiceService = new InvoiceService(apiConfig.invoice, WebClient, mqtt)
export const collectionOfButtonsService = new CollectionOfButtonsService(apiConfig.collectionOfButtons, WebClient, mqtt)
export const levelMonitorService = new LevelMonitorService(apiConfig.levelMonitor, WebClient, mqtt)

export const boardController = new BoardController(boardService)
export const invoiceController = new InvoiceController(invoiceService)
export const collectionOfButtonsController = new CollectionOfButtonsController(collectionOfButtonsService)
