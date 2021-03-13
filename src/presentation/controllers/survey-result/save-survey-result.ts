import { serverSuccess } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return serverSuccess(surveys)
  }
}
