import type { ClientIdentifier } from './mqtt'

export type ButtonState = { buttonId: string; value: number }
export type CollectionOfButtonsData = ClientIdentifier & { data: ButtonState }
