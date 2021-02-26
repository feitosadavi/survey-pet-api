import { serverError, serverSuccess, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-protocols'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      this.validation.validate(httpRequest.body)
      this.validation.validate(email)

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }

      return serverSuccess({ accessToken })
    } catch (e) {
      return serverError(e)
    }
  }
}
