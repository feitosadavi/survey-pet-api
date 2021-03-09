import { NextFunction, Request, Response } from 'express'
import { HttpRequest, Middleware } from '@/presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { // adapto o request
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body) // coloco a resposta na requisição
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
