import { LoadSurveys, SurveyModel } from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'
import { serverError, serverSuccess } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
  ]
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

type SutTypes = {
  loadSurveysStub: LoadSurveys
  sut: SaveSurveyResultController
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new SaveSurveyResultController(loadSurveysStub)
  return {
    loadSurveysStub,
    sut
  }
}

describe('SaveSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call load with correct values', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const fakeRequest = {
      body: {}
    }
    await sut.handle(fakeRequest)
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on loadSurvey success', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverSuccess(makeFakeSurveys()))
  })

  test('Should return 500 if loadSurvey throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const fakeRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
