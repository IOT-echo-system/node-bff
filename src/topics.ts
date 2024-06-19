import type { WidgetType } from './typing/mqtt'

type WidgetTopics = { name: string; topics: Array<{ topic: string }> }

const widget: Record<WidgetType, WidgetTopics> = {
  BOARD: { name: 'BOARD', topics: [] },
  INVOICE: { name: 'INVOICE', topics: [{ topic: 'action/+/code/+' }, { topic: 'action/+' }] },
  COLLECTION_OF_BUTTONS: { name: 'COLLECTION_OF_BUTTONS', topics: [{ topic: 'update-value' }] },
  LEVEL_MONITOR: { name: 'LEVEL_MONITOR', topics: [{ topic: 'update-value' }] }
}

const createTopics = (): string[] => {
  return Object.keys(widget).flatMap((keyName: string): string[] => {
    return widget[keyName as WidgetType].topics.map(topic => `${keyName}/+/${topic.topic}`)
  })
}

export const topics = ['HEART_BEAT', ...createTopics()]
