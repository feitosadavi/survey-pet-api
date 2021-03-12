import { AddSurveyResultModel } from '@/domain/usecases/survey/save-survey'

export interface SaveSurveyResultRepository {
  saveResult(data: AddSurveyResultModel): Promise<void>
}
