import { SaveSurveyResult } from '@/domain/usecases/survey/save-survey'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, serverError, serverSuccess } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveyById.loadById(httpRequest.body)
      const surveyResult = await this.saveSurveyResult.save(httpRequest.body)
      return serverSuccess(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
