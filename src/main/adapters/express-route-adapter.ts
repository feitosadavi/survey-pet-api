import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

// através do padrão de projeto adapter, conseguimos desaclopar a aplicação do express
// desta forma, caso precisemos trocar o framework, basta modificar o adapter
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body) // precisamos retornar um status code e um json, pois é a forma que o express entende um res
  }
}
