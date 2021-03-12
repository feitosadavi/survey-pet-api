import { SurveyResultModel } from '@/domain/models/survey-result'
import { AddSurveyResultModel } from '@/domain/usecases/survey/save-survey'

export interface SaveSurveyResultRepository {
  saveResult(data: AddSurveyResultModel): Promise<SurveyResultModel>
}
