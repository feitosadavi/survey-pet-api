import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { SurveyModel } from './load-surveys-protocols'
import { LoadSurveysController } from './load-surveys'

const makeFakeSurvey = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image.png',
        answer: 'any_answer'
      }]
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image.png',
        answer: 'other_answer'
      }]
    }
  ]
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveysStub {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveysStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurvey Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSurveysSpy).toHaveBeenCalled()
  })
})
