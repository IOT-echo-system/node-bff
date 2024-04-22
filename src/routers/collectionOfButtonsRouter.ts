import express from 'express'
import { handleRequest } from './handleRequest'
import { collectionOfButtonsController } from '../controllers'

const collectionOfButtonsRouter = express.Router()

collectionOfButtonsRouter.post(
  '/:widgetId/buttons/:buttonId/state',
  handleRequest(collectionOfButtonsController.updateButtonState)
)

export default collectionOfButtonsRouter
