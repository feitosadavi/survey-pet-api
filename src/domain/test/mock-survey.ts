import { SurveyModel } from '../models/survey'
import { AddSurvey, AddSurveyParams } from '../usecases/survey/add-survey'
import { LoadSurveys } from '../usecases/survey/load-surveys'

export const mockSurveysParams = (): AddSurveyParams[] => {
  return [
    {
      question: 'any_question',
      answers: [{
        image: 'any_image.png',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      question: 'other_question',
      answers: [{
        image: 'other_image.png',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

export const mockSurveysModel = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image.png',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image.png',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveysStub {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModel()))
    }
  }
  return new LoadSurveysStub()
}
