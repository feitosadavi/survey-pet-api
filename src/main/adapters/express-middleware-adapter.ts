import { NextFunction, Request, Response } from 'express'
import { HttpRequest, Middleware } from '@/presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { // adapta o request
      headers: req.headers // pega os headers que foram enviados
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body) // coloco o body da resposta, no caso o accountId, na requisição
      next() // passa pra frente
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
