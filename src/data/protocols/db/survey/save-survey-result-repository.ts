import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey'

export interface SaveSurveyResultRepository {
  saveResult(data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
