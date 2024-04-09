import type { Packet } from 'mqtt'
import type { BoardData } from './board'
import type { InvoiceData } from './invoice'

export type WidgetType = 'BOARD' | 'INVOICE'
export type Widget = { widgetId: string; name: WidgetType }
export type ClientId = { clientId: string }
export type ClientIdentifier = ClientId & { widget: Widget }
export type MqttPacket = Packet | undefined

export type MqttTopicData = ClientIdentifier & { data: BoardData | InvoiceData }
