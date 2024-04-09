const board = { baseUrl: '/boards', heartBeat: '/heartbeat' } as const
export type BoardConfig = typeof board

const invoice = {
  baseUrl: '/widgets/invoice/{invoiceId}',
  reset: '/items/reset',
  items: '/items',
  state: '/state'
} as const
export type InvoiceConfig = typeof invoice

export const apiConfig = {
  baseUrl: process.env.API_BACKEND_URL!,
  board,
  invoice
} as const
