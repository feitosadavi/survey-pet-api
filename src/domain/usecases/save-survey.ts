import { SurveyResultModel } from '../models/survey-result'

type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save (data: SurveyResultModel): Promise<SurveyResultModel>
}
