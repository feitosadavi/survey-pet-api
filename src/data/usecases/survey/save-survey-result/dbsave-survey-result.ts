import { SaveSurveyResultRepository, SaveSurveyResult, AddSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: AddSurveyResultModel): Promise<void> {
    await this.saveSurveyResultRepository.saveResult(data)
    return null
  }
}
