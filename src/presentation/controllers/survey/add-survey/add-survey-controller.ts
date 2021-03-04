import { badRequest } from '../../../helpers/http/http-helper'
import { HttpResponse } from '../../../protocols'
import { Controller, HttpRequest, Validation } from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(new Error())
    return new Promise(resolve => resolve(null))
  }
}
