import { LoadSurveys, SurveyModel } from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'

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
  test('Should call load with correct values', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const fakeRequest = {
      body: {}
    }
    await sut.handle(fakeRequest)
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return surveys on load success', async () => {
    const { sut } = makeSut()
    const fakeRequest = {
      body: {}
    }
    const surveys = await sut.handle(fakeRequest)
    expect(surveys.body.length).toBeGreaterThan(0)
  })
})
