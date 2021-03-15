import { SurveyModel } from '../../models/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add (surveyData: AddSurveyParams): Promise<void>
}
