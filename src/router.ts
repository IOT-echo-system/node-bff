import express from 'express'
import { boardRouter, invoiceRouter } from './routers'

const router = express.Router()

router.use('/boards', boardRouter)
router.use('/widgets/invoices', invoiceRouter)

export default router
