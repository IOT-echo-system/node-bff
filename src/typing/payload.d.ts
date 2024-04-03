import type { InvoicePayload } from './invoice'
import type { DigitalPayload } from './digital'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type PayloadMetaData = {
  meta: { method: HttpMethod; path: string; body: Record<string, any>; authorization: string }
}

export type Payload = {
  INVOICE: InvoicePayload
  DIGITAL: DigitalPayload
}
