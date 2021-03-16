import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './dbsave-survey-result'
import { throwError, mockSaveSurveyResultParams, mockSurveyResultModel, mockSaveSurveyResultRepository } from '@/domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call saveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult')
    await sut.save(mockSaveSurveyResultParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams())
  })

  test('Should return an SurveyResult on saveSurveyResultRepository success', async () => {
    const { sut } = makeSut()
    const response = await sut.save(mockSaveSurveyResultParams())
    expect(response).toEqual(mockSurveyResultModel())
  })

  test('Should throw if saveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult').mockImplementationOnce(throwError)
    const promsie = sut.save(mockSaveSurveyResultParams())
    await expect(promsie).rejects.toThrow()
  })
})
