import { serverSuccess } from '../../../helpers/http/http-helper'
import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return serverSuccess(surveys)
  }
}
