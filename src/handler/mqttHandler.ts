import logger from 'logging-starter'
import type { MqttTopicData, WidgetType } from '../typing/mqtt'
import { boardService, collectionOfButtonsService, invoiceService } from '../controllers'
import type { InvoiceData } from '../typing/invoice'
import type { BoardData } from '../typing/board'
import type { Packet } from 'mqtt'
import type { CollectionOfButtonsData } from '../typing/collectionOfButtons'

const parseMqttTopicData = (topic: string): MqttTopicData => {
  const [_client, clientId, _board, boardId, widgetName, widgetId, ...topicParts] = topic.split('/')
  const parsedData: Record<string, string> = {}
  for (let index = 0; index < topicParts.length; index += 2) {
    parsedData[topicParts[index]] = topicParts[index + 1]
  }
  if (widgetName === 'HEART_BEAT' && !widgetId) {
    return { clientId, boardId, widget: { name: 'BOARD', widgetId: 'boardId' }, data: { action: widgetName } }
  }
  return { clientId, boardId, widget: { name: widgetName as WidgetType, widgetId }, data: parsedData }
}

export const handleMqttMessage = (topic: string, payload: Buffer, packet: Packet): void => {
  try {
    const mqttTopicData = parseMqttTopicData(topic)
    switch (mqttTopicData.widget.name) {
      case 'BOARD': {
        boardService.handle(mqttTopicData as BoardData).catch(() => ({}))
        return
      }
      case 'INVOICE': {
        invoiceService.handle(mqttTopicData as InvoiceData).catch(() => ({}))
        return
      }
      case 'COLLECTION_OF_BUTTONS': {
        collectionOfButtonsService.handle(mqttTopicData as CollectionOfButtonsData).catch(() => ({}))
        return
      }
      default:
        logger.error({ errorMessage: 'handle topic name' })
    }
  } catch (error: unknown) {
    logger.error({ errorMessage: 'Something went wrong!', error: error as Error })
  }
}
