import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultRepository, SaveSurveyResult, AddSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: AddSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.saveResult(data)
    return surveyResult
  }
}
