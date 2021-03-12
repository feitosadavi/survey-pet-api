import { SaveSurveyResultRepository, AddSurveyResultModel } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './dbsave-survey-result'
import MockDate from 'mockdate'

const makeFakeAddSurveyResultModel = (): AddSurveyResultModel => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async saveResult (data: AddSurveyResultModel): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('SaveSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call saveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult')
    await sut.save(makeFakeAddSurveyResultModel())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeAddSurveyResultModel())
  })

  test('Should return undefined on saveSurveyResultRepository success', async () => {
    const { sut } = makeSut()
    const response = await sut.save(makeFakeAddSurveyResultModel())
    expect(response).toBeUndefined()
  })
})
