import type { HttpMethod } from '../typing/payload'
import type { RequestHandler } from '../typing/app'

type AppRequestHandler = { method: HttpMethod; path: string; callback: RequestHandler }

class App {
  handlers: AppRequestHandler[] = []

  post(path: string, callback: RequestHandler) {
    this.handlers.push({ path, callback, method: 'POST' })
  }

  get(path: string, callback: RequestHandler) {
    this.handlers.push({ path, callback, method: 'GET' })
  }

  put(path: string, callback: RequestHandler) {
    this.handlers.push({ path, callback, method: 'PUT' })
  }

  delete(path: string, callback: RequestHandler) {
    this.handlers.push({ path, callback, method: 'DELETE' })
  }
}

export const createApp = (): App => new App()
