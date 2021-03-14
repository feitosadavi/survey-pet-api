import { LoadSurveyById, SurveyModel, AddSurveyResultModel, SaveSurveyResult, HttpRequest, SurveyResultModel } from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'
import { forbidden, serverError, serverSuccess } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => {
  return {
    params: {
      surveyId: 'any_surveyId'
    },
    body: {
      answer: 'any_answer',
      accountId: 'any_accountId',
      date: new Date()
    }
  }
}

const makeFakeSurvey = (): SurveyModel => {
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
    answer: 'any_answer',
    date: new Date()
  }
}

const makeFakeAddSurveyResult = (): AddSurveyResultModel => {
  return {
    surveyId: 'any_surveyId',
    accountId: 'any_accountId',
    answer: 'any_answer',
    date: new Date()
  }
}

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
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
  const loadSurveyByIdStub = makeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('LoadSurveys Dependencie', () => {
    test('Should call load with correct values', async () => {
      const { sut, loadSurveyByIdStub } = makeSut()
      const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
      await sut.handle(makeFakeRequest())
      expect(loadByIdSpy).toHaveBeenCalledWith('any_surveyId')
    })

    test('Should return 403 if no survey where found', async () => {
      const { sut, loadSurveyByIdStub } = makeSut()
      jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 403 if an invalid answer is provided', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({
        params: {
          surveyId: 'any_surveyId'
        },
        body: {
          answer: 'wrong_answer'
        }
      })
      expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
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
      expect(saveSpy).toHaveBeenCalledWith(makeFakeAddSurveyResult())
    })

    test('Should return 200 on saveSurveyResult success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverSuccess(makeFakeSurveyResult()))
    })

    test('Should return 500 if saveSurveyResult throws', async () => {
      const { sut, saveSurveyResultStub } = makeSut()
      jest.spyOn(saveSurveyResultStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
