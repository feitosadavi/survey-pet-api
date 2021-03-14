import { Controller, HttpRequest, HttpResponse, LoadSurveyById, serverError, serverSuccess, SaveSurveyResult } from './save-survey-result-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId, answer } = httpRequest.body
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)

        if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({ surveyId, accountId, answer, date: new Date() })

      return serverSuccess(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
