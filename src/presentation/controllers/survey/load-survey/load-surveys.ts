import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return new Promise(resolve => resolve(null))
  }
}
