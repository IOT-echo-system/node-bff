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
  baseUrl: '/widgets/invoices/{invoiceId}',
  reset: '/items/reset',
  items: '/items/{code}',
  state: '/state'
} as const
export type CollectionOfButtonsConfig = typeof collectionOfButtons

export const apiConfig = {
  baseUrl: process.env.API_GATEWAY_BASE_URL!,
  board,
  invoice,
  collectionOfButtons
} as const
