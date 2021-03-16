import { Controller, HttpRequest, HttpResponse, LoadSurveyById, serverError, serverSuccess, SaveSurveyResult } from './save-survey-result-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer')) // se a resposta enviada não existir nas opções do survey...
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      // se o survey existir e a resposta for válida, eu salvo o resultado
      const surveyResult = await this.saveSurveyResult.save({ surveyId, accountId, answer, date: new Date() })

      return serverSuccess(surveyResult)
    } catch (error) {
      console.log(error)

      return serverError(error)
    }
  }
}
