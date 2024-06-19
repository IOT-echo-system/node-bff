const board = { baseUrl: '/boards', heartBeat: '/heartbeat' } as const
export type BoardConfig = typeof board

const invoice = {
  baseUrl: '/widgets/invoices/{invoiceId}',
  reset: '/items/reset',
  items: '/items/{code}',
  state: '/state'
} as const
export type InvoiceConfig = typeof invoice

const collectionOfButtons = {
  baseUrl: '/widgets/collection-of-buttons/{widgetId}',
  sensorValue: '/sensors/{buttonId}/value'
} as const
export type CollectionOfButtonsConfig = typeof collectionOfButtons

const levelMonitor = {
  baseUrl: '/widgets/level-monitor/{widgetId}',
  sensorValue: '/value'
} as const
export type LevelMonitorConfig = typeof levelMonitor

export const apiConfig = {
  baseUrl: process.env.API_GATEWAY_BASE_URL!,
  board,
  invoice,
  collectionOfButtons,
  levelMonitor
} as const
