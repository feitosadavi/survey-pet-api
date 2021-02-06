import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

// com o decorator eu adiciono um comportamento ao controlador, sem modificar o controlador
// A classe que vamos decorar, deve do mesmo tipo da classe que estamos implementando ou herdando
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
