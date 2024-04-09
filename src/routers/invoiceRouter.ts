import express from 'express'
import { handleRequest } from './handleRequest'
import { invoiceController } from '../controllers'

const invoiceRouter = express.Router()

invoiceRouter.post('/:invoiceId/state', handleRequest(invoiceController.updateState))

export default invoiceRouter
