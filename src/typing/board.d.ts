import type { ClientIdentifier } from './mqtt'

export type BoardData = ClientIdentifier & { data: { action: 'HEART_BEAT' } }
