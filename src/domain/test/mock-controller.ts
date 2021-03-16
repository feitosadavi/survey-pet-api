import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        body: {
          name: 'Davi'
        },
        statusCode: 200
      }
      return Promise.resolve(httpResponse)
    }
  }
  return new ControllerStub()
}
