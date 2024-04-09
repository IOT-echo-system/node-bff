import type { Request, Response } from 'express'
import axios from 'axios'
import { HttpStatus } from '../config/http'
import logger from 'logging-starter'

const handleApiException = (response: Response) => {
  return (error: Error): Response => {
    logger.error({
      errorCode: 'API_FAILURE',
      errorMessage: 'Api failure response',
      error: error,
      searchableFields: { traceId: response.req.app.locals.traceId }
    })
    if (axios.isAxiosError(error)) {
      return response.status(error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR).send(
        error.response?.data ?? {
          errorCode: 'IOT-3002',
          message: 'API failure'
        }
      )
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      errorCode: 'IOT-3002',
      message: 'Internal server error'
    })
  }
}

type RequestHandler<T> = (request: Request, response: Response) => Promise<T>
export const handleRequest = <T>(requestHandler: RequestHandler<T>) => {
  return (request: Request, response: Response): void => {
    requestHandler(request, response)
      .then(data => response.send(data))
      .catch(handleApiException(response))
  }
}
