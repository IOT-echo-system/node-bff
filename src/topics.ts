export const topics = ['INVOICE', 'DIGITAL'] as const

export type Topic = (typeof topics)[number]
