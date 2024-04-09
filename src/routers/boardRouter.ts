import express from 'express'
import { handleRequest } from './handleRequest'
import { boardController } from '../controllers'

const boardRouter = express.Router()

boardRouter.get('/restart', handleRequest(boardController.restart))
boardRouter.get('/setup', handleRequest(boardController.setupMode))

export default boardRouter
