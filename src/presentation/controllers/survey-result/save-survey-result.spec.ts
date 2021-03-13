import {
  LoadSurveyById, SurveyModel, AddSurveyResultModel, SaveSurveyResult, HttpRequest,
  serverError, SurveyResultModel
} from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      surveyId: 'any_surveyId',
      accountId: 'any_accountId',
      answer: 'any_answer',
      date: new Date()
    }
  }
}

const makeFakeSurveys = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

const makeFakeSurveyResult = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_surveyId',
    accountId: 'any_accountId',
    answer: 'any_asnwer',
    date: new Date()
  }
}

const makeLoadSurveys = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: AddSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}

type SutTypes = {
  loadSurveyByIdStub: LoadSurveyById
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveys()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('LoadSurveys Dependencie', () => {
    test('Should call load with correct values', async () => {
      const { sut, loadSurveyByIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
      await sut.handle(makeFakeRequest())
      expect(loadSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })

    test('Should return 500 if loadSurvey throws', async () => {
      const { sut, loadSurveyByIdStub } = makeSut()
      jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('SaveSurvey Dependencies', () => {
    test('Should call saveSurveyResult with correct values', async () => {
      const { sut, saveSurveyResultStub } = makeSut()
      const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
      await sut.handle(makeFakeRequest())
      expect(saveSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })
  })
})
