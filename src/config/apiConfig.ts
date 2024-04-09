const board = { baseUrl: '/boards', heartBeat: '/heartbeat' } as const
export type BoardConfig = typeof board

const invoice = {
  baseUrl: '/widgets/invoices/{invoiceId}',
  reset: '/items/reset',
  items: '/items/{code}',
  state: '/state'
} as const
export type InvoiceConfig = typeof invoice

export const apiConfig = {
  baseUrl: process.env.API_GATEWAY_BASE_URL!,
  board,
  invoice
} as const
