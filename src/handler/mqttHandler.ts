import logger from 'logging-starter'
import type { MqttTopicData, WidgetType } from '../typing/mqtt'
import { boardService, invoiceService } from '../controllers'
import type { InvoiceData } from '../typing/invoice'
import type { BoardData } from '../typing/board'

const parseMqttTopicData = (topic: string): MqttTopicData => {
  const [clientId, widgetName, widgetId, ...topicParts] = topic.split('/').slice(1)
  const parsedData: Record<string, string> = {}
  for (let index = 0; index < topicParts.length; index += 2) {
    parsedData[topicParts[index]] = topicParts[index + 1]
  }
  if (widgetName === 'HEART_BEAT' && !widgetId) {
    return { clientId, widget: { name: 'BOARD', widgetId: 'boardId' }, data: { action: widgetName } }
  }
  return { clientId, widget: { name: widgetName as WidgetType, widgetId }, data: parsedData }
}

export const handleMqttMessage = (topic: string): void => {
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
      default:
        logger.error({ errorMessage: 'handle topic name' })
    }
  } catch (error: unknown) {
    logger.error({ errorMessage: 'Something went wrong!', error: error as Error })
  }
}
