import { LoadAccountByToken, HttpRequest, HttpResponse, Middleware } from './auth-middleware-protocols'
import { AccessDeniedError } from '../errors'
import { forbidden, serverError, serverSuccess } from '../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'] // pega o accessToken que eu coloquei nos headers

      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role) // procura uma conta que tenha o accessToken dos headers
        if (account) { // se tiver:
          return serverSuccess({ accountId: account.id }) // retorna o id da conta encontrada com o accessToken e coloca no body da resposta do middleware
        }
      }
      return forbidden(new AccessDeniedError()) // se não achar um conta com o accessToken ou não tiver o accessToken, retorna acesso negado
    } catch (error) {
      return serverError(error)
    }
  }
}
