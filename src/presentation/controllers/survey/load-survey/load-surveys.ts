import { noContent, serverError, serverSuccess } from '../../../helpers/http/http-helper'
import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? serverSuccess(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
