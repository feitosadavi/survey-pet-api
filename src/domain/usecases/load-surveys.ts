import { AddSurveyModel } from './add-survey'

export interface LoadSurveys {
  load (): Promise<AddSurveyModel[]>
}
