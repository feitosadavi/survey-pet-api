import { DbAddSurvey } from './db-add-survey'
import { mockAddSurveyRepository, mockSurveysParams, throwError } from '@/domain/test'
import MockDate from 'mockdate'

const makeSut = (): any => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date()) // congela a data com base no valor inserido
  })

  afterAll(() => {
    MockDate.reset() // congela a data com base no valor inserido
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const surveyData = mockSurveysParams()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const surveyData = mockSurveysParams()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(surveyData)
    await expect(promise).rejects.toThrow()
  })
})
