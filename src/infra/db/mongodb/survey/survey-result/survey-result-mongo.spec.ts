import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

describe('SurveyMongo Repository', () => {
  let surveysCollection: Collection
  let surveysResultsCollection: Collection
  let accountsCollection: Collection

  // antes e depois de cada teste de integração, precisamos conectar e desconectar do banco
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // removo todos os registros da tabela antes de cada teste. Para não populuir as tabelas
  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.deleteMany({})
    accountsCollection = await MongoHelper.getCollection('accounts')
    await surveysCollection.deleteMany({})
    surveysResultsCollection = await MongoHelper.getCollection('surveyResults')
    await surveysResultsCollection.deleteMany({})
  })

  const makeFakeSurvey = async (): Promise<SurveyModel> => {
    const res = await surveysCollection.insertOne({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        { answer: 'any_answer' }
      ],
      date: new Date()
    })
    return res.ops[0]
  }

  const makeFakeAccount = async (): Promise<AccountModel> => {
    const res = await accountsCollection.insertOne({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    return res.ops[0]
  }

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
  }

  describe('saveResult()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeFakeSurvey()
      const account = await makeFakeAccount()
      const surveyResult = await sut.saveResult({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: survey.date
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
