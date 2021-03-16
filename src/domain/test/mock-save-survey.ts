import { SurveyModel } from '../models/survey'
import { SurveyResultModel } from '../models/survey-result'
import { LoadSurveyById } from '../usecases/survey/load-survey-by-id'
import { SaveSurveyResult, SaveSurveyResultParams } from '../usecases/survey/save-survey'
import { mockSurveysModel } from './mock-survey'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

export const mockSurveyResultModel = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveysModel()[0]))
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultStub()
}
