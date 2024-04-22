import type { ClientIdentifier } from '../../../typing/mqtt'

export type ActionMap = {
  ADD: { action: 'ADD'; code: string }
  REMOVE: { action: 'REMOVE'; code: string }
  RESET: { action: 'RESET'; code?: never }
  STATE: { action: 'STATE'; code?: never }
}

export type InvoiceData<T extends keyof ActionMap = keyof ActionMap> = ClientIdentifier & { data: ActionMap[T] }
export type ButtonState = { buttonId: string; type: 'ANALOG' | 'DIGITAL'; mode: 'INPUT' | 'OUTPUT'; value: number }
