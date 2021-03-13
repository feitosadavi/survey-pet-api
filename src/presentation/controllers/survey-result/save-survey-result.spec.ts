import { LoadSurveys, SurveyModel } from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve([]))
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
  test('Should call load with correct values', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const fakeRequest = {
      body: {}
    }
    await sut.handle(fakeRequest)
    expect(loadSpy).toHaveBeenCalled()
  })
})
