import express from 'express'
import { boardRouter, invoiceRouter } from './routers'
import collectionOfButtonsRouter from './routers/collectionOfButtonsRouter'

const router = express.Router()

router.use('/boards', boardRouter)
router.use('/widgets/invoices', invoiceRouter)
router.use('/widgets/collection-of-buttons', collectionOfButtonsRouter)

export default router
