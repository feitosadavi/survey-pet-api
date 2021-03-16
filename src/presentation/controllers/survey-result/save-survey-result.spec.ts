import { LoadSurveyById, SaveSurveyResult, HttpRequest } from './save-survey-result-protocols'
import { SaveSurveyResultController } from './save-survey-result'
import { forbidden, serverError, serverSuccess } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { mockLoadSurveyById, mockSaveSurveyResult, mockSaveSurveyResultParams, mockSurveyResultModel, throwError } from '@/domain/test'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => {
  return {
    params: {
      surveyId: 'any_survey_id'
    },
    body: {
      answer: 'any_answer',
      date: new Date()
    },
    accountId: 'any_account_id'
  }
}

type SutTypes = {
  loadSurveyByIdStub: LoadSurveyById
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
}

const mockSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const saveSurveyResultStub = mockSaveSurveyResult()
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
      const { sut, loadSurveyByIdStub } = mockSut()
      const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
      await sut.handle(mockRequest())
      expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if no survey where found', async () => {
      const { sut, loadSurveyByIdStub } = mockSut()
      jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 403 if an invalid answer is provided', async () => {
      const { sut } = mockSut()
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
      const { sut, loadSurveyByIdStub } = mockSut()
      jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('SaveSurvey Dependencies', () => {
    test('Should call saveSurveyResult with correct values', async () => {
      const { sut, saveSurveyResultStub } = mockSut()
      const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
      await sut.handle(mockRequest())
      expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams())
    })

    test('Should return 200 on saveSurveyResult success', async () => {
      const { sut } = mockSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverSuccess(mockSurveyResultModel()))
    })

    test('Should return 500 if saveSurveyResult throws', async () => {
      const { sut, saveSurveyResultStub } = mockSut()
      jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
